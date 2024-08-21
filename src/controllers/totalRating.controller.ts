import { Request, Response } from "express";
import { reviewModel } from "../models/review.model";
import mongoose from "mongoose";

export const totalRating = async (req: Request, res: Response) => {
    try {
        console.log('totalrating',req.params);
        
        const {product_id}=req.params;
       const rating=await reviewModel.find({product_id:new mongoose.Types.ObjectId(product_id)},{_id:0,rating:1})
       const totalRating=rating.reduce((total,item)=>total+item.rating,0)/rating.length
       const roundTotal=parseFloat(totalRating.toFixed(1))
       
        res.status(200).json(roundTotal)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}