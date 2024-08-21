
import { v2 as cloudinary } from "cloudinary"
const uploadOnCloudinary = async (files: any) => {
    try {
        const uploadedResult = Promise.all(files.map(async (file: Express.Multer.File) => await cloudinary.uploader.upload(file.path)));
        return uploadedResult;
    } catch (error) {
        console.log(error);
        throw new Error("cloudinary file upload wentwrong");

    }

}
export default uploadOnCloudinary