import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();


const socketAuthenticator = async(err,socket,next) =>{
    try{
        if(err)return(err);

        const authToken = socket.request.cookies['token'];
        if(!authToken){
            return next(new Error("please login to access this route",404));
        }

        const decodedData = jwt.verify(authToken,process.env.JWT_SECRET);

        const user = await User.findById(decodedData._id);

        if(!user){
            return next(new Error("please login to access this route",404));
        }

        socket.user = user;

        return next();
    }catch(err){
        console.log(err);
        return next(new Error("there is some error in socketAuthenticator"))
    }
}

export default socketAuthenticator;