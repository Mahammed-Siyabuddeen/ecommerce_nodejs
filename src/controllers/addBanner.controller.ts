import { Request, Response } from "express";
import { bannerModel } from "../models/banner.model";
import mongoose from "mongoose";
import uploadOnCloudinary from "../utils/uploadOnCloudinary";
import fs from 'fs'
export const addBanner = async (req: Request, res: Response) => {
    try {
        const { heading, sub_heading, product_id } = req.body;
        if(!req.file) throw new Error('file multer error');
        const image_url=await uploadOnCloudinary(req.file)
        fs.unlink(req.file.path,(err)=>{})
        const db = new bannerModel({
            product_id: new mongoose.Types.ObjectId(product_id),
            heading,
            sub_heading,
            image_url
        })
        await db.save()
        res.status(200).json(db)

    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}