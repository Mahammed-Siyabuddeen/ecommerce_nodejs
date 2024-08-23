import { Request, Response } from "express";
import { productModel } from "../models/Product";
import { Error, StringExpression } from "mongoose";
import mongoose from "mongoose";


export const getproducts = async (req: Request, res: Response) => {

    try {
        const { name, category,price ,brand,rating,size} = req.query;
        console.log(req.query);
        let products;
        let query:{
            $text?:any,
            category_id?:mongoose.Types.ObjectId,
            price?:any,brand?:string,
            'ratings.average'?:any,
            sizes?:any
        }={}

        if (name) 
            query.$text= {$search:(name  as string)}
         if(category)
            query.category_id=new mongoose.Types.ObjectId(category as string)
        if(price)
            query.price={ $lt: price }
        if(brand)
            query.brand=brand as string;
        if(rating)
            query["ratings.average"]=rating 
        if(size)
            query.sizes={$in:[size]}
        console.log(query);

        products = await productModel.find(query).limit(10).exec()
        console.log(products);

        return res.status(200).json(products)
    } 
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}