
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from 'cloudinary'

export const cloudinaryconfig= cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

