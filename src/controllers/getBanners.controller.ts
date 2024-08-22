import { Request, Response } from "express";
import { bannerModel } from "../models/banner.model";

export const getBanners = async (req: Request, res: Response) => {
    try {
        const banners=await bannerModel.find({}).sort({created_at:-1}).limit(5);

        res.status(200).json(banners);
    }
    catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message })
        res.status(400).json({message:"something wrong"})
    }
}  