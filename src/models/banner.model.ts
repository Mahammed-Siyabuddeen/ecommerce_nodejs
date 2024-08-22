import mongoose from "mongoose";


const bannerSchema = new mongoose.Schema(
    {
        heading: { type: String, required: true, },
        sub_heading: { type: String, required: true, },
        product_id: { type: mongoose.Types.ObjectId, required: true },
        image_url: { type: String, required: true },
        created_at:{type:Date,default:new Date()},
    }
)
export const bannerModel = mongoose.model('banner', bannerSchema)