import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

export const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    const errorMessage = errors.array().map((err) => err.msg).join(",");
    console.log(errorMessage);
    if (errors.isEmpty()) {
        return next()
    }
    else {
        next(new ErrorHandler(errorMessage, 400));
    }
};

export const registerValidator = () => [
    body("name", "Please enter Name").notEmpty(),
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
    body("bio", "Please enter bio").notEmpty(),
];

export const loginValidator = () => [
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
];

export const newGroupChatValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("members").notEmpty().withMessage("Please enter Members").isArray({ min: 2, max: 100 }).withMessage("Members must be between 2 and 100"),
];

export const addMemberValidator = () => [
    body("chatId", "Please enter chatId").notEmpty(),
    body("members").notEmpty().withMessage("Please enter Members").isArray({ min: 1, max: 97 }).withMessage("Members must be between 1 and 97"),
];

export const removeMemberValidator = () => [
    body("chatId", "Please enter chat Id").notEmpty(),
    body("userId", "Please enter user Id").notEmpty(),
];

export const leaveGroupValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];

export const sendAttachmentsValidator = () => [
    body("chatId", "Please enter chat Id").notEmpty(),
];

export const getMessagesValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];

export const getChatDetailsValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];
export const renameGroupValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
    body("name", "Please enter Name").notEmpty(),

];
export const deleteChatValidator = () => [
    param("id", "Please enter chat Id").notEmpty(),
];

export const sendFriendRequestValidator = () => [
    body("userId", "Please enter user Id").notEmpty(),
];

export const acceptFriendRequestValidator = () => [
    body("requestId", "Please enter Request Id").notEmpty(),
    body("accept").notEmpty()
    .withMessage("Please add Accept").isBoolean().withMessage("Accept must be a boolean"),

];

export const adminLoginValidator = () => [
    body("secretKey", "Please enter Secret Key ").notEmpty(),
];