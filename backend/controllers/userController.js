import { TryCatch } from '../middlewares/error.js';
import { User } from '../models/userModel.js'
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from '../utils/features.js';
import bcryptjs from 'bcryptjs'
import { ErrorHandler } from '../utils/utility.js';
import { Chat } from '../models/chatModel.js';
import { Request } from '../models/requestModel.js';
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMember } from '../lib/helper.js';
//create new user and save to database and cookies


export const SignUp = TryCatch(async (req, res, next) => {
    const { name, username, password, bio } = req.body;
    const file = req.file;
    console.log(file);
    if (!file) return next(new ErrorHandler("Please upload avatar"));

    const result = await uploadFilesToCloudinary([file]);

    const avatar = {
        public_id: result[0].public_id,
        url: result[0].url,
    };

    const user = await User.create({
        name,
        avatar,
        username,
        password,
        bio
    });

    sendToken(res, user, 201, "User created successfully");
});



export const SignIn = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid Username", 404));
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid Password", 404));
    }
    sendToken(res, user, 200, `Welcome Back ${user.name}`);

}
)

export const getMyProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user);
    res.status(200).json({
        success: true,
         user,
    })
})


export const Logout = TryCatch(async (req, res) => {
    return res.status(200).cookie("chatApp-token", "", { ...cookieOptions, maxAge: 0 }).json({
        success: true,
        message: "You have been logged out"
    })

});


export const SearchUser = TryCatch(async (req, res) => {
    const { name = "" } = req.query;
    //Find all my chats
    const myChats = await Chat.find({ groupChat: false, members: req.user });
    // Extracting All Users from myChats means friends or people i have chat with
    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members)
    // Find all users except friends and me
    const allUsersExeptMeAndFriends = await User.find({
        _id: { $nin: allUsersFromMyChats },
        name: { $regex: name, $options: "i" },
    });

    const users = allUsersExeptMeAndFriends.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
    }));

    return res.status(200).json({
        success: true,
        users,
    })

});


export const sendFriendRequest = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
    const request = await Request.findOne({
        $or: [
            { sender: userId, receiver: req.user },
            { sender: req.user, receiver: userId }
        ]
    })
    if (request) return next(new ErrorHandler("Request Already sent"));

    await Request.create({
        sender: req.user,
        receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId]);


    return res.status(200).json({
        success: true,
        message: "Friend request sent"
    })

});



export const acceptFriendRequest = TryCatch(async (req, res, next) => {
    const { requestId, accept } = req.body; // Destructuring request ID and accept boolean from request body
    
    // Find the friend request document by ID and populate sender and receiver fields with their names
    const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name");

    // If no request is found, invoke the error handler middleware with "Request not found" error
    if (!request) {
        return next(new ErrorHandler("Request not found"));
    }

    // Check if the current user is authorized to accept the request
    if (request.receiver._id.toString() !== req.user.toString()) {
        return next(new ErrorHandler("You are not authorized to accept request", 401));
    }

    // If accept is false, delete the request and respond with success message and sender ID
    if (!accept) {
        await request.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Friend request rejected",
            sender: request.sender._id,
        });
    }

    // If accept is true, create a new chat between sender and receiver, delete the request, and emit a chat refresh event
    const members = [request.sender._id, request.receiver._id];
    
    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}-${request.receiver.name}`,
        }),
        request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    // Respond with success message indicating friend request accepted
    return res.status(200).json({
        success: true,
        message: "Friend request accepted"
    });
});





export const getAllNotifications = TryCatch(async (req, res, next) => {
    const requests = await Request.find({ receiver: req.user }).populate(
        "sender",
        "name avatar",
    )

    const allRequests = await requests.map(({ _id, sender }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        }
    }))
    return res.status(200).json({
        success: true,
        allRequests,
    })
});

export const getMyFriends = TryCatch(async (req, res, next) => {

    try {
        const chatId = req.query.chatId;

        // Retrieve user's private chats
        const chats = await Chat.find({
            members: req.user,
            groupChat: false,
        }).populate("members", "name avatar");
        // Extract friends from chat members
        const friends = chats.map(({ members }) => {
            const otherUser = getOtherMember(members, req.user);
            return {
                _id: otherUser._id,
                name: otherUser.name,
                avatar: otherUser.avatar.url,
            };
        });

        // Filter friends if chatId is provided
        if (chatId) {
            const chat = await Chat.findById(chatId);

            // Check if chat exists
            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: 'Chat not found',
                });
            }

            // Filter friends not in the specified chat
            const availableFriends = friends.filter((friend) => !chat.members.includes(friend._id));
            return res.status(200).json({
                success: true,
                friends: availableFriends,
            });
        } else {
            // Return all friends if no chatId is specified
            return res.status(200).json({
                success: true,
                friends,
            });
        }
    } catch (error) {
        next(error);
    }
});
