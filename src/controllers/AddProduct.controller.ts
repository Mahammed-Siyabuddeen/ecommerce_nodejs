import { Request, Response } from "express"
import { productModel } from "../models/Product"
import mongoose from "mongoose"
import multer from "multer"
import  { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import uploadOnCloudinary from "../utils/uploadOnCloudinary"
import { validationResult } from "express-validator"
import fs from 'fs'

interface Ibody {
    name: string,
    description: string,
    price: number,
    mrp: number
    category_id: mongoose.Types.ObjectId,
    stock_quantity: number,
    brand:string,
}
const storage =new CloudinaryStorage({
    cloudinary:cloudinary,
    })

 const ProductUpload = multer({ storage })
const AddProduct = async (req: Request, res: Response) => {

    try {
        if(!req.files) throw new Error('file multer error');
        const uploadedResult=await uploadOnCloudinary(req.files as Array<any>)
        if(Array.isArray(req.files))
        req.files.map((file:Express.Multer.File)=>fs.unlink(file.path,()=>{})) 
        const { name, description, price, mrp, category_id, stock_quantity,sizes,brand } = req.body
        const db =  new productModel({
            name,
            description,
            price:Number(price),
            mrp:Number(mrp),
            category_id,
            stock_quantity:Number(stock_quantity),
            imagesUrl:( uploadedResult as UploadApiResponse[]).map(file=>file.secure_url),
            sizes:JSON.parse(sizes),
            brand
        })
        
        const product=await db.save();
        res.status(201).json(
            {
                _id:product._id,
                name:product.name,
                price:product.price,
                stock_quantity:product.stock_quantity,
                imagesUrl:product.imagesUrl
            });
        
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}

export default AddProduct