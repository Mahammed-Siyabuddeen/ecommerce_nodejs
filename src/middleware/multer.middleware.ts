import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public')
    },
    filename:(req,file,cb)=>{
        const uniqe=Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,file.originalname)
    }
})

export const ProductUpload=multer({storage})