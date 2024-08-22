import { Request, Response } from "express";
import { categoryModel } from "../models/category.model";


const getCategory = async (req: Request, res: Response) => {
    try {
        const db = await categoryModel.find({},{name:1,_id:1}).exec()
        
        res.status(200).json(db)
        
    } 
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}

export default getCategory