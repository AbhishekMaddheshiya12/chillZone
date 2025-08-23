import { v2 as cloudinary} from "cloudinary"
import { v4 as uuidv4 } from 'uuid';

export const getBase64 = (file) => 
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

const uploadFilesToCloudinary = async(files = []) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(getBase64(file), {resource_type: "auto",public_id: uuidv4()}, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    })

    try{
        const results = await Promise.all(uploadPromises);
        const formatedResults = results.map((result) => ({
            public_id:result.public_id,
            url:result.secure_url
        }))

        return formatedResults; 
    }catch(error){
        throw new Error("Error uploading files to cloudinary",error)
    }
}

export  {uploadFilesToCloudinary};