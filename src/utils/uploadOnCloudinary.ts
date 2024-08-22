
import { v2 as cloudinary } from "cloudinary"
const uploadOnCloudinary = async (files: any) => {
    try {
      if(Array.isArray(files)){
          const uploadedResult = Promise.all(files.map(async (file: Express.Multer.File) => await cloudinary.uploader.upload(file.path)));
          return uploadedResult;
      }else{
        const result=await cloudinary.uploader.upload((files.path as string ))
        return result.secure_url;
      }
    } catch (error) {
        console.log(error);
        throw new Error("cloudinary file upload wentwrong");

    }

}
export default uploadOnCloudinary