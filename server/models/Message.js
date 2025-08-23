import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    content: String,

    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },

    attachment: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
