import { Request, Response } from "express";
import { wishListModel } from "../models/wishlist.model";
import mongoose from "mongoose";

export const addTowishList = async (req: Request, res: Response) => {
    try {
        const { user_id, product_id } = req.body;
        const exists=await wishListModel.findOne({user_id:new mongoose.Types.ObjectId(user_id),product_id:new mongoose.Types.ObjectId(product_id)})
        console.log(exists);
        
        if(exists) throw new Error('item already added')
        const db = new wishListModel({
            user_id: new mongoose.Types.ObjectId(user_id),
            product_id: new mongoose.Types.ObjectId(product_id),
        })
        await db.save();
        res.status(204).json({ message: 'added successfully' })

    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  