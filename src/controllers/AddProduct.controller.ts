import { Request, Response } from "express"
import { productModel } from "../models/Product"
import mongoose from "mongoose"
import multer from "multer"
import  { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 as cloudinary } from 'cloudinary'
import uploadOnCloudinary from "../utils/uploadOnCloudinary"
import { validationResult } from "express-validator"


interface Ibody {
    name: string,
    description: string,
    price: number,
    mrp: number
    category_id: mongoose.Types.ObjectId,
    stock_quantity: number,
}
const storage =new CloudinaryStorage({
    cloudinary:cloudinary,
    })

 const ProductUpload = multer({ storage })
const AddProduct = async (req: Request, res: Response) => {

    try {
        if(!req.files) throw new Error('file multer error');
        // console.log(req.files)
        const uploadedResult=await uploadOnCloudinary(req.files)
        console.log(uploadedResult);
        
        const { name, description, price, mrp, category_id, stock_quantity } = req.body
        const db =  new productModel({
            name,
            description,
            price,
            mrp,
            category_id,
            stock_quantity,
            imagesUrl: uploadedResult.map(file=>file.url)
        })
        
        db.save()
        
    } catch (error: unknown) {
        if (error instanceof Error)
            res.status(401).send({ error: error.message })

        console.log(error);
    }
}

export default AddProduct