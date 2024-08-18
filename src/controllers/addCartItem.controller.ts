import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { cartModel } from "../models/cart.model";
import { cartItemModel } from "../models/cartItem.model";

const addCartItem =async (req: Request, res: Response) => {
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()) throw new Error(errors.array().toString());

        const {user_id,product_id,size}=req.body;
        console.log(user_id,product_id,size);
        
        const quantity=1;
        let cart=await cartModel.findOne({user_id});

        if(!cart){
            cart=new cartModel({user_id})
        }
        let cartItem=await cartItemModel.findOne({cart_id:cart?._id,product_id})
        if(cartItem){
            cartItem.quantity+=1;

        }else{
             cartItem=new cartItemModel({cart_id:cart?._id,product_id,quantity,size:size})
        }
        cart.updated_at=new Date();
         cartItem.save();
         cart.save()
        const data=await Promise.all([cart,cartItem])
       console.log(data);
       
        console.log('sucees');
        
        res.status(201).json({_id:data[0]._id,cartItem_id:data[1]._id,quantity:data[1].quantity});
        
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
        res.status(500).json({ message: 'category not created' });

    }
}

export default addCartItem;