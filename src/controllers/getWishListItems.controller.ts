import { Request, Response } from "express";
import { wishListModel } from "../models/wishlist.model";
import mongoose from "mongoose";

export const getWishListItems = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        const products=await wishListModel.aggregate([
            {
                $match:{user_id:new mongoose.Types.ObjectId(user_id)}
            },
            {
                $lookup:{
                    from:'products',
                    localField:'product_id',
                    foreignField:'_id',
                    as:'product'
                }
            },
            {$unwind:'$product'},
            {
                $project:{
                    product_id:0,
                    user_id:0
                }
            }
        ])
        res.status(200).json(products)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  