import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { cartModel } from "../models/cart.model";
import mongoose from "mongoose";
import { cartItemModel } from "../models/cartItem.model";

export const getCartCount = async(req: Request, res: Response) => {
    try {
        const {user_id}=req.body;
        const count=await cartModel.aggregate([
            {
                $match:{user_id:new mongoose.Types.ObjectId(user_id)}
            },
            {
                $lookup:{
                    from:'cartitems',
                    localField:'_id',
                    foreignField:'cart_id',
                    as:'cartitems'
                }
            },
            {
                $project: {
                    total: { $size: "$cartitems" }
                }
            }
        ])
        console.log(count);
        
        const documentCount = count.length > 0 ? count[0].total : 0;
        
        res.status(200).json(documentCount)
        
    } 
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}
