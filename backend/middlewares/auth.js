import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import { adminSecretKey } from "../server.js";
import { CHATAPP_TOKEN } from "../constants/config.js";
import { User } from "../models/userModel.js";


export const isAuthenticated = TryCatch(async (req, res,next) => {
    const token = req.cookies[CHATAPP_TOKEN];
    if(!token) {
        return next(new ErrorHandler("Please login for fetching data.",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decodedData._id;
    next();
})

export const AdminOnly = TryCatch(async (req, res,next) => {
    const token = req.cookies["chatApp-admin-token"];
    if(!token) {
        return next(new ErrorHandler("Only admin can access",401));
    }
    const secretKey = jwt.verify(token,process.env.JWT_SECRET);
    const isMatched = secretKey === adminSecretKey;
    if(!isMatched) {
        return next(new ErrorHandler("Only admin can access",401))
    }
    next();
})


export const socketAuthenticator = async(err, socket, next) =>{
    try {

        if(err) return next(err);


        const authToken = socket.request.cookies[CHATAPP_TOKEN];
        if(!authToken){
            return next(new ErrorHandler("Please login to access this route",401));
        }
        const decodedData = jwt.verify(authToken,process.env.JWT_SECRET);
        const user = await User.findById(decodedData._id)
        if(!user) return next(new ErrorHandler("Please login to access this route",401));
        socket.user = user;
        return next();

    } catch (error) {
        console.log(error)
        return next(new ErrorHandler("Please login to access these routes",401))

    }
};

