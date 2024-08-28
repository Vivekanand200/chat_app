import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { adminSecretKey } from "../server.js";
import { cookieOptions } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken'

export const adminLogin = TryCatch(async (req, res, next) => {
    const { secretKey } = req.body;
    const isMatched = secretKey === adminSecretKey;
    if (!isMatched) {
        return next(new ErrorHandler("Invalid admin secret key", 401));
    }
    const token = jwt.sign(secretKey, process.env.JWT_SECRET);
    return res.status(200).cookie("chatApp-admin-token", token, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 15,
    })
        .json({
            success: true,
            message: "Authenticated successfully,Welcome BOSS!"
        });

});

export const adminLogout = TryCatch(async (req, res, next) => {

    return res.status(200).cookie("chatApp-admin-token", "", {
        ...cookieOptions,
        maxAge: 0,
    })
        .json({
            success: true,
            message: "Logout Successfully, Bye Bye BOSS!"
        });

});

export const getAdminData = TryCatch(async (req, res, next) => {
    return res.status(200).json({
        admin: true,
    });
});

export const getAllUsers = TryCatch(async (req, res) => {
    const users = await User.find({});

    const transformedUsers = await Promise.all(
        users.map(async ({ name, username, avatar, _id }) => {

            const [groups, friends] = await Promise.all([
                Chat.countDocuments({ groupChat: true, members: _id }),
                Chat.countDocuments({ groupChat: false, members: _id }),
            ])
            
            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groups,
                friends
            }
        })
    );
    return res.status(200).json({
        success: true,
        users: transformedUsers,
    });
});


export const getAllChats = TryCatch(async (req, res) => {
    const chats = await Chat.find({})
        .populate("members", "name avatar")
        .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
        chats.map(async ({ name, members, creator, _id, groupChat }) => {


            const totalMessages = await Message.countDocuments({ chat: _id });

            return {
                _id,
                name,
                groupChat,
                avatar: members.slice(0, 3).map((member) => member.avatar.url),
                members: members.map(({ _id, name, avatar }) => ({
                    _id,
                    name,
                    avatar: avatar.url
                })),
                creator: {
                    name: creator?.name || "None",
                    avatar: creator?.avatar.url || ""
                },
                totalMembers: members.length,
                totalMessages

            }
        })
    );
    return res.status(200).json({
        success: true,
        chats: transformedChats,
    });
});

export const getAllMessages = TryCatch(async (req, res, next) => {

    const messages = await Message.find({})
        .populate("sender", "name avatar")
        .populate("chat", "groupChat");

    const transformedMessages = await Promise.all(
        messages.map(({ content, attachments, sender, createdAt, _id, chat }) => ({
            _id,
            attachments,
            content,
            createdAt,
            chat: chat._id,
            groupChat: chat.groupChat,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url,
            }
        }))
    );

    return res.status(200).json({
        success: true,
        messages: transformedMessages,
    });

});


export const getDashboardStats = TryCatch(async (req, res, next) => {

    const [groupsCount, usersCount, messagesCount, totalChatsCount] = await Promise.all([
        Chat.countDocuments({ groupChat: true }),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
    ])

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7)

    const last7DaysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,
            $lte: today,
        }
    }).select("createdAt");

    const messages = new Array(7).fill(0);

    const dayInMilliseconds = (1000 * 60 * 60 * 24)
    last7DaysMessages.forEach((message) => {
        const indexApprox = (today.getTime() - message.createdAt.getTime()) / dayInMilliseconds;
        const index = Math.floor(indexApprox);
        messages[6 - index]++;
    })
    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart: messages,
    }

    return res.status(200).json({
        success: true,
        messages: stats,
    });

});




