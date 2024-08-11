import mongoose from "mongoose";


const orderItemSchema=new mongoose.Schema({
    price:{type:Number,require:true},
    quantity:{type:Number,require:true},
    order_id:{type:mongoose.Types.ObjectId,required:true},
    product_id:{type:mongoose.Types.ObjectId,required:true},
    create_at:{type:Date,default:new Date()},
})

export const orderItemsModel=mongoose.model('orderItems',orderItemSchema);