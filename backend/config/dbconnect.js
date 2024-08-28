import mongoose from "mongoose";

const connectDB = (uri)=>{
    mongoose.connect(uri)
    .then((data)=> console.log(`Connected to DB: ${data.connection.host}`))
    .catch((error)=> {
        throw error;
    });
}


export default connectDB