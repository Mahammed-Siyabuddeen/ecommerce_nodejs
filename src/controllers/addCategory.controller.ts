import { Request, Response } from "express";
import { categoryModel } from "../models/category.model";


const addCategory = async(req: Request, res: Response) => {
    try {
        const { name } = req.body;
        console.log(req.body);
        
        const exists=await categoryModel.findOne({name});
        if(exists) throw new Error('category already exists')
            
        const db =await categoryModel.create({ name })
       res.status(201).json({name:db.name,id:db._id});
    } catch (error:unknown) {
        console.log(error);
        if(error instanceof Error)
         return  res.status(500).json({message:error.message});
          res.status(500).json({message:'category not created'});

    }
}

export default addCategory