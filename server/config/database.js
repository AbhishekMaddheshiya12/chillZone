import mongoose from "mongoose";


export const dbConnect = (url) => {
    mongoose.connect(url,{

    }).then(()=>console.log("DB connected")).catch((err) => console.log(err));
}