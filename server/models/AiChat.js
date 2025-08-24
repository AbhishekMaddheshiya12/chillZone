import mongoose from "mongoose";

const AiChat = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    content: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        enum: ["user", "assistant"],
        required: true
    }
}, {
    timestamps: true 
});

export const AiChatModel = mongoose.model("AiChatModel",AiChat);