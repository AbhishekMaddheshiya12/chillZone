import { GoogleGenAI } from "@google/genai";
import { AiChatModel } from "../models/AiChat.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const aiChat = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const ans = await AiChatModel.create({
      userId: req.user._id,
      content: prompt,
      role: "user",
    });


    const chatHistory = await AiChatModel.find({ userId: req.user })
      .sort({ createdAt: -1 })
      .limit(20);

    let conversationContext = "";
    if (chatHistory.length > 1) {
      const previousMessages = chatHistory.reverse().slice(0, -1);
      conversationContext =
        previousMessages
          .map((chat) => `${chat.role}: ${chat.content}`)
          .join("\n") + "\n";
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${conversationContext} + user:${prompt}`,
      config: {
        systemInstruction: {
          text: "You are a beatuiful girl you are funny in nature and you are a good friend also you are a very smart and a very good person",
        },
      },
    });

    await AiChatModel.create({
      userId: req.user._id,
      content: response.text,
      role: "assistant",
    });

    return res.status(200).json({
      sucess: true,
      message: response.text,
    });
  } catch (eror) {
    return res.status(404).json({
      sucess: false,
      message: "Assistent is not in service right now",
    });
  }
};

export { aiChat };
