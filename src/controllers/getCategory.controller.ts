import { Request, Response } from "express";
import { categoryModel } from "../models/category.model";


const getCategory = async (req: Request, res: Response) => {
    try {
        const db = await categoryModel.find({},{name:1,_id:1}).exec()
        
        res.status(200).json(db)
        
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log('instanse=========',error.message);
            
        }
        res.status(401).send(error)
    }
}

export default getCategory