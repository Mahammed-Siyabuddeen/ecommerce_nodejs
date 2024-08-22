import { Request, Response } from "express";
import { productModel } from "../models/Product";
import mongoose from "mongoose";


export const popularProduct=async (req: Request, res: Response) => {
    try {
        const products=await productModel.find({}).sort({"ratings.average":-1}).limit(4);     
        
        res.status(200).json(products)
    } 
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}