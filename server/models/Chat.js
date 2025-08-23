import mongoose from "mongoose";
import User from "./User.js";


const chatSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        
        creator:{
            type:mongoose.Types.ObjectId,
            ref:"User",
        },

        
        passkey:{
            type:String,
            required: true
        },

        members:[{
            type:mongoose.Types.ObjectId,
            ref:"User",
        }],
    },
    {
        timestamps:true,
    }
)

export const Chat = mongoose.model("Chat",chatSchema);