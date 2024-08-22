import { Request, Response } from "express";
import { reviewModel } from "../models/review.model";
import mongoose from "mongoose";
import { categoryModel } from "../models/category.model";

export const categoryByName = async (req: Request, res: Response) => {
    try {
        const {name}=req.query;
        const data=await categoryModel.find({name}).limit(1)
        res.status(200).json(data[0])
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}