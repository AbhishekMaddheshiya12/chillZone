import { emitEvent } from "../index.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import User from "../models/User.js";
import { uploadFilesToCloudinary } from "../utils/features.js";

const createGroup = async (req, res, next) => {
  try {
    const { name, passKey } = req.body;
    // console.log(name, passKey);
    const allMember = [req.user];

    const room = await Chat.findOne({name});
    if(room){
        return res.status(400).json({
            success:false,
            message:"Room Already exist"
        })
    }

    const response = await Chat.create({
      name,
      creator: req.user,
      members: allMember,
      passkey: passKey,
    });

    return res.status(200).json({
      success: true,
      message: "Group has been created",
      chatId: response._id,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: true,
      message: "There is some error in creating the group",
    });
  }
};

const getMyChats = async (req, res, next) => {
  try {
    const userId = req.user; // Ensure userId is derived from req.user

    const chats = await Chat.find({ members: userId }).populate(
      "members",
      "name"
    );

    // console.log(chats);

    const transformedChats = chats.map(({ _id, name, members }) => {
      const otherMember = members.find(
        (member) => member._id.toString() !== userId.toString()
      );

      return {
        _id,
        name: name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== userId.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
        otherMember: otherMember ? otherMember.name : null,
      };
    });

    return res.status(201).json({
      success: true,
      transformedChats,
    });
  } catch (error) {
    // console.error(error);
    return res.status(400).json({
      success: false,
      message: "There is some error",
    });
  }
};

const joinGroup = async (req, res, next) => {
  try {
    const { groupName, passkey } = req.body;
    const user = req.user;

    if (!groupName || !passkey) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const chat = await Chat.findOne({ name: groupName });

    if (!chat) {
      return res.status(400).json({
        success: false,
        message: "Group does not exist",
      });
    }

    if (chat.passkey !== passkey) {
      return res.status(400).json({
        success: false,
        message: "Incorrect passkey",
      });
    }

    // Ensure user IDs are compared as strings
    const isMember = chat.members.some(
      (member) => member.toString() === user._id.toString()
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this group",
      });
    }

    chat.members.push(user._id); // Add the user's ID to members
    await chat.save();

    emitEvent(req, chat.members, "NEW_MESSAGE", {
        message:{content:"New Roomer Joins The Group"},
        chat: chat._id,
      });
    return res.status(200).json({
      success: true,
      message: "You have joined the group",
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Error joining group:", error);
    return res.status(500).json({
      success: false,
      message: "There is some error",
    });
  }
};

const getChatDetails = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    // console.log(chatId);

    const chat = await Chat.findById(chatId).populate("members", "name").lean();

    // console.log("This is in the getChatDetails controller and line num -125 "+chat);

    if (!chat) {
      return res.status(400).json({
        success: false,
        message: "Chat does not exist",
      });
    }

    chat.members = chat.members.map(({ _id, name }) => ({
      _id,
      name,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "There is some error",
    });
  }
};

const getMessages = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat id is required",
      });
    }

    const { page = 1 } = req.query;

    const resultPerPage = 25;

    const skip = (page - 1) * resultPerPage;

    const [message, totalMessagesCount] = await Promise.all([
      Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate("sender", "name")
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / resultPerPage);

    // const message = await Message.find({ chat: chatId })
    //   .populate("sender", "name")
    //   .lean();

    return res.status(200).json({
      success: true,
      message: message.reverse(),
      totalPages,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "There is some error",
    });
  }
};

const getMembers = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat id is required",
      });
    }

    const chat = await Chat.findById(chatId).populate("members");

    return res.status(200).json({
      success: true,
      message: "Members received",
      members: chat.members,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error",
    });
  }
};

const groupByMe = async (req, res, next) => {
  try {
    const userId = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }
    const Chats = await Chat.findOne({ creator: userId });

    return res.status(200).json({
      success: true,
      message: "Chats received",
      Chats,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error in fetching the groups",
    });
  }
};

const sendAttachment = async (req, res) => {
  try {
    const { chatId } = req.body;
    const {_id} = req.user;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "ChatId required",
      });
    }

    const [chat, me] = await Promise.all([
      Chat.findById(chatId),
      User.findById(_id),
    ]);

    if (!chat) {
      return res.status(400).json({
        success: false,
        message: "Chat not found",
      });
    }
    // console.log("User"+me);
    const files = req.files || [];
    // console.log(files);

    if (files.lenght < 1) {
      return res.status(400).json({
        success: false,
        message: "Please provide an attachment",
      });
    }

    // from here sending file to the cloudinary
    const attachments = await uploadFilesToCloudinary(files);
    // console.log("This is attachment"+attachments);

    const messageForDB = {
      content: "",
      attachment: attachments,
      sender: me._id,
      chat: chatId,
    };
    const messageForRealTime = {
      ...messageForDB,
      sender: {
        _id: me._id,
        name: me.name,
      },
    };

    const message = await Message.create(messageForDB);

    // Emit event and sending response
    emitEvent(req, chat.members, "NEW_MESSAGE", {
      message: messageForRealTime,
      chat: chatId,
    });
    // response
    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    //console.error("Error sending attachment:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending the attachment",
    });
  }
};

export {
  createGroup,
  getMyChats,
  joinGroup,
  getChatDetails,
  getMessages,
  getMembers,
  groupByMe,
  sendAttachment
};
