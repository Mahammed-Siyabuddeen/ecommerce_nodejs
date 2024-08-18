import { Request, Response } from "express";
import { wishListModel } from "../models/wishlist.model";
import mongoose from "mongoose";

export const removeWishListItem = async (req: Request, res: Response) => {
    try {
        const {item_id}=req.params;
        await wishListModel.findByIdAndDelete(item_id)
        res.status(204).json({message:"successfully removed"})
}
catch (error: unknown) {
    if (error instanceof Error)
        return res.status(400).send(error.message)
    res.status(400).send("something wrong")
}
}  