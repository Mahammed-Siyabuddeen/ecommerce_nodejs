import { Request, Response } from "express";
import { cartItemModel } from "../models/cartItem.model";

export const removeCartItem= async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        
        const {cartitem_id}=req.params;
       await cartItemModel.findByIdAndDelete(cartitem_id);
        res.status(204).json({message:'succeesfully removed'});
    } catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}