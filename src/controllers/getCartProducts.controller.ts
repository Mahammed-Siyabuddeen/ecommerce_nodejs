import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { cartModel } from "../models/cart.model";
import mongoose from "mongoose";

const getCartProducts = async(req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        console.log(req.body);
        
        if (!errors.isEmpty()) throw new Error(errors.array().toString());

        const { user_id}:{user_id:string} = req.body;
        const products=await cartModel.aggregate([
            {
                $match:{user_id:new mongoose.Types.ObjectId(user_id)}
            },
            {
                $lookup:{
                    from:'cartitems',
                    localField:'_id',
                    foreignField:'cart_id',
                    as:'items'
                }
            },
            {
                $unwind:'$items'
            },
            {
                $lookup:{
                    from:'products',
                    localField:'items.product_id',
                    foreignField:'_id',
                    as:'products'
                }
            },
            {
                $unwind:'$products'
            },
            {
                $project:{
                    _id:1,
                    quantity:"$items.quantity",
                    cartItem_id:'$items._id',
                    product_id:"$products._id",
                    name:"$products.name",
                    price:"$products.price",
                    brand:"$products.brand",
                    imagesUrl:"$products.imagesUrl",
                    total:{$multiply:["$products.price","$items.quantity"]}

                }
            }
        ])
        console.log(products);
        res.status(200).json(products)
        
    } 
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}

export default getCartProducts;