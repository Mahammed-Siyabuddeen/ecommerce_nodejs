import { Request, Response } from "express"
import { categoryModel } from "../models/category.model"


const getCategoryWithCount = async (req: Request, res: Response) => {
    try {
        const db = await categoryModel.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'category_id',
                    as: 'products'
                }
            },
            {
                $project: {
                    name: 1,
                    _id: 1,
                    totalProduct: { $size: '$products' }
                }
            }

        ])

        res.status(200).json(db)

    } catch (error: unknown) {
        if (error instanceof Error)
            res.status(401).send({ error: error.message })

        console.log(error);
    }
}

export default getCategoryWithCount