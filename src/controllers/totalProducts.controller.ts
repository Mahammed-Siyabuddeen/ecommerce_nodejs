import { Request, Response } from "express";
import { productModel } from "../models/Product";

export const totalProducts=async (req: Request, res: Response) => {
    try {
        const count=await productModel.countDocuments();
        res.status(200).json(count)
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  