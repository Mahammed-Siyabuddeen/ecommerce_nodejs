
import { Request, Response } from "express";
import { orderItemsModel } from "../models/orderItems.model";
import { productModel } from "../models/Product";
import { reviewModel } from "../models/review.model";
import mongoose from "mongoose";
import { CustomerModel } from "../models/customers.model";
export const addProductReview = async (req: Request, res: Response) => {
    try {
        const { user_id, orderItem_id, rating, comment } = req.body;
        const orderItem = await orderItemsModel.findById(orderItem_id);
        if (!orderItem) throw new Error("orderItem not valid");

        const db = new reviewModel({
            user_id: new mongoose.Types.ObjectId(user_id),
            product_id: orderItem.product_id,
            rating,
            comment
        })
        const setrating = await productModel.findByIdAndUpdate(orderItem.product_id,
            [
                {
                    $set: {
                        "ratings.count": { $add: ["$ratings.count", 1] },
                        "ratings.average": {
                            $divide: [
                                { $add: [{ $multiply: ["$ratings.average", "$ratings.count"] }, rating] },
                                { $add: ["$ratings.count", 1] }
                            ]
                        }
                    }
                }
            ],
            { new: true }
        )
        console.log(setrating);

        db.save();

        res.status(204).send();
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}