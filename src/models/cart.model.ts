import mongoose from "mongoose";

export interface cartType{
    user_id:mongoose.Types.ObjectId ,
    created_at:Date,
    updated_at:Date,
}

const cartSchema=new mongoose.Schema({
    user_id:{type:mongoose.Types.ObjectId,required:true},
    created_at:{type:Date,default:new Date()},
    updated_at:{type:Date,default:new Date()},
})

export const cartModel=mongoose.model('cart',cartSchema)