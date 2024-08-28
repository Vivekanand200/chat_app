import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import {v4 as uuid} from 'uuid'
import { getBase64, getSockets } from '../lib/helper.js';
export const cookieOptions = {
    maxAge: 15 * 60 * 60 *1000,
    sameSite:"none",
    httpOnly: true,
    secure: true

}
const sendToken = ( res,user,code,message) => {
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)

    return res.status(code).cookie("chatApp-token",token,cookieOptions).json({
        success: true,
        user,
        message,
        
    })
};

export const emitEvent = (req,event,users,data)=>{
    const io = req.app.get("io");
    const usersSocket = getSockets(users);
    io.to(usersSocket).emit(event,data);

}

export const uploadFilesToCloudinary = async(files=[]) => {
    const uploadPromises = files.map((file) =>{
        return new Promise((resolve,reject) =>{
            cloudinary.uploader.upload(
                getBase64(file),{
                    resource_type:"auto",
                    public_id:uuid(),
                },
                (error,result) =>{
                    if(error) return reject(error);
                    resolve(result);
                }
            )
        })

    });
    try {
        const results = await Promise.all(uploadPromises);

        const formattedResults = results.map((result) =>({
            public_id:result.public_id,
            url:result.url,
        }))
        return formattedResults;
    } catch (error) {
        throw new Error("Error uploading files to cloudinary", error);
    }
}

export const deleteFilesFromCloudinary = ({public_ids}) => {};

export {sendToken};