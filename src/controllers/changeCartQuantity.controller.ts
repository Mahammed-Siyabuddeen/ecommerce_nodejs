import { Request, Response } from "express"
import { validationResult } from "express-validator";
import { cartItemModel } from "../models/cartItem.model";

const changeCartQuantity = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new Error(errors.array().toString());
        const { cartItem_id, quantity } = req.body;
        
        const cartItem=await cartItemModel.findById(cartItem_id);
        if(!cartItem) throw new Error("cartitem id invalid please check");
        cartItem.quantity+=quantity;
        if(cartItem.quantity<1) cartItem.quantity=1;
        cartItem.save();
        res.status(201).json("succesfful qauntity updated");

    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
        res.status(500).json({ message: 'category not created' });

    }
}

export default changeCartQuantity;