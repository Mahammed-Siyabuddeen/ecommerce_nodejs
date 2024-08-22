import { Request, Response } from "express";
import mongoose from "mongoose";
import { CustomerModel } from "../models/customers.model";

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers=await CustomerModel.find({},{password:0});
        res.status(200).json(customers);
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}
