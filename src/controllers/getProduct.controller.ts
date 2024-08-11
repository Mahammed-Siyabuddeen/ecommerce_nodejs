import { Request, Response } from "express";
import { productModel } from "../models/Product";
import mongoose from "mongoose";


export const getProduct = async (req: Request, res: Response) => {

    console.log(req.params);
    const {id}=req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('parameter id incorrect')
        const product=await productModel.findById(id).exec()
        res.status(200).json(product);
    }catch (error:unknown) {
        if(error instanceof Error)
           return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
    
}
