import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name: { type: String,text:true, required: true, },
        description: { type: String,text:true, required: true },
        price: { type: Number, required: true },
        mrp: { type: Number, required: true },
        category_id: { type: mongoose.Types.ObjectId,text:true, required: true },
        brand:{type:String,required:true},
        stock_quantity: { type: Number, required: true },
        created_at: { type: Date, default: new Date() },
        imagesUrl: { type: [String], required: true },
        sizes: { type: [String] },
        ratings: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 }
        },
        soldCount: { type: Number, default: 0 }
    }
)
export const productModel = mongoose.model('Products', productSchema)