
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from 'cloudinary'

export const cloudinaryconfig= cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME||'dn1atq3py',
    api_key:process.env.API_KEY||'894666243728637',
    api_secret:process.env.API_SECRET||'exqN0AJMiNDqKeS705J4EDdF2AY'
})

