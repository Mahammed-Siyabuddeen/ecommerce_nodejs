import { Request, Response } from "express";
import { productModel } from "../models/Product";
import mongoose from "mongoose";


export const relatedProduct=async (req: Request, res: Response) => {
    try {
        console.log('related product' ,req.query);
        
        const {category_id,product_id }=req.query;
        const products=await productModel.find({
            category_id:new mongoose.Types.ObjectId(category_id as string),
            _id:{$ne:new mongoose.Types.ObjectId(product_id as string)}
        }).limit(8);     
        
        res.status(200).json(products)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}