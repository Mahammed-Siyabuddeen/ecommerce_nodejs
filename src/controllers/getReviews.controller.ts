import { Request, Response } from "express";
import { reviewModel } from "../models/review.model";
import mongoose from "mongoose";

export const getReviews = async (req: Request, res: Response) => {
    try {
        console.log('getrevimes',req.params);
        
        const {product_id}=req.params;
        const reviews=await reviewModel.aggregate([
            {
                $match:{product_id:new mongoose.Types.ObjectId(product_id)}
            },
            {
                $lookup:{
                    from:"customers1",
                    localField:"user_id",
                    foreignField:"_id",
                    as:"customers"
                }
            },
            {$unwind:"$customers"},
            {
                $project:{
                    customer_name:"$customers.first_name",
                    user_id:1,
                    product_id:1,
                    rating:1,
                    comment:1,
                    createdAt:1
                }
            }
        ])
        
        res.status(200).json(reviews)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}