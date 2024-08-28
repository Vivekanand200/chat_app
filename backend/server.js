import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';
import connectDB from './config/dbconnect.js';
import { CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, NEW_MESSAGE_ALERT, ONLINE_USERS, START_TYPING, STOP_TYPING } from './constants/events.js';
import { getSockets } from './lib/helper.js';
import { errorMiddleware } from './middlewares/error.js';
import { Message } from './models/messageModel.js';
import adminRouter from './routes/adminRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import userRouter from './routes/userRoutes.js';
import { v2 as cloudinary } from 'cloudinary'
import { corsOptions } from './constants/config.js';
import { socketAuthenticator } from './middlewares/auth.js';
dotenv.config();
const port = process.env.PORT || 3000;
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "secretkey";
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
export const userSocketIDs = new Map();

const onlineUsers = new Set();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const server = createServer(app);




const io = new Server(server, {
    cors: corsOptions,
});

app.set("io", io);

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/api/v1/users', userRouter)
app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/admin', adminRouter)

//socket connection
io.use((socket, next) => {  //socket middleware
    cookieParser()(socket.request, socket.request.res,
        async (err) => await socketAuthenticator(err, socket, next)
    )
});

io.on('connection', (socket) => {
    const user = socket.user;

    userSocketIDs.set(user._id.toString(), socket.id);

    // console.log(userSocketIDs);//id connected to socket id
    // console.log("a user connected", socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        try {
            // Ensure user is defined
            if (!user || !user._id || !user.name) {
                throw new Error("User object is not properly defined");
            }

            const messageForRealTime = {
                content: message,
                _id: uuid(),
                sender: {
                    _id: user._id,
                    name: user.name,
                },
                chat: chatId,

                createdAt: new Date().toISOString(),
            };

            const messageForDB = {
                content: message,
                sender: user._id,
                chat: chatId,
            };

            //console.log("Emitting", members);

            const membersSocket = getSockets(members);

            // Ensure membersSocket does not contain any undefined or null values

            io.to(membersSocket).emit(NEW_MESSAGE, {
                chatId,
                message: messageForRealTime,
            });
            io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId }); // for notification
            // console.log(messageForDB)
            try {
                await Message.create(messageForDB);
                // console.log("Save to database");
            } catch (error) {
                console.error("Error saving to database", error);
            }
        } catch (error) {
            console.error("Error in NEW_MESSAGE handler", error);
        }
    });

    socket.on(START_TYPING, ({ members, chatId }) => {
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(START_TYPING, { chatId });
        console.log("typing",chatId, members)
    });

    socket.on(STOP_TYPING, ({ members, chatId }) => {
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(STOP_TYPING, { chatId });
        console.log("stop-typing",chatId, members)
    });

    socket.on(CHAT_JOINED,({userId,members})=>{
        onlineUsers.add(userId.toString())
        const membersSockets = getSockets(members);

        io.to(membersSockets).emit(ONLINE_USERS,Array.from(onlineUsers))
    });
    socket.on(CHAT_LEAVED,({userId,members})=>{
        onlineUsers.delete(userId.toString())
        const membersSockets = getSockets(members);

        io.to(membersSockets).emit(ONLINE_USERS,Array.from(onlineUsers))
    });

    socket.on("disconnect", () => {
        //console.log("user disconnected");
        userSocketIDs.delete(user._id.toString());
        onlineUsers.delete(user._id.toString())
        socket.broadcast.emit(ONLINE_USERS,Array.from(onlineUsers))
    });
})
//
app.use(errorMiddleware);

server.listen(port, (req, res) => {
    console.log(`Server is listening on ${port} in ${envMode} Mode`);
    connectDB(process.env.MONGODB_URL);
})



//friends request rejected not supported
//Error in new group create