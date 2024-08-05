import { Request, Response } from "express";
import { productModel } from "../models/Product";
import { Error } from "mongoose";


export const getproducts=async(req:Request,res:Response)=>{

    try {
        const products=await productModel.find().sort({"created_at":1}).limit(10).exec()
        res.status(200).json(products)
    } catch (error:unknown) {
        if(error instanceof Error)
            res.status(400).send(error.message)
        res.status(400).send("something wrong")
    }
}