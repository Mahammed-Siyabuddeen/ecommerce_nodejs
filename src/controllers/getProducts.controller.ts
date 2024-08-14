import { Request, Response } from "express";
import { productModel } from "../models/Product";
import { Error } from "mongoose";
import mongoose from "mongoose";


export const getproducts = async (req: Request, res: Response) => {

    try {
        const { name, category } = req.query;
        console.log(req.query);
        let products;
        if (name) {
             products = await productModel.find({
                $text: { $search: (name as string) }
            }).sort({ score: { $meta: "textScore" } }).limit(10).exec()
        }
        else if(category){
           products=await productModel.find({category_id:new mongoose.Types.ObjectId(category as string)})
            .limit(10).exec();
        }
        return  res.status(200).json(products)
    } catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}