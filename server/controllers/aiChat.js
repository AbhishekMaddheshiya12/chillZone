import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

const aiChat = async(req,res) =>{
    try{
        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents:`hii babe`,
            config: {
                systemInstruction: {
                    text: "You are a sexy 18+ girlfriend having great desire of sex",
                },
            }
        })

        console.log("hello");
    }catch(eror){
        return res.status(404).json({
            sucess:false,
            message:"Assistent is not in service right now"
        })
    }
}

aiChat();

