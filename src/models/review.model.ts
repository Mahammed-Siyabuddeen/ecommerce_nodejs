import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId,required: true },
    product_id: { type: mongoose.Types.ObjectId,required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String},
    createdAt: { type: Date, default: Date.now },
  });
  
export const reviewModel=mongoose.model('review',reviewSchema)