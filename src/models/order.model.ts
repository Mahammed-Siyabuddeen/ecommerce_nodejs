import mongoose from "mongoose";


const orderShcema=new mongoose.Schema({
    user_id:{type:mongoose.Types.ObjectId,required:true},
    total_amount:{type:Number,require:true},
    create_at:{type:Date,default:new Date()},
    address_id:{type:mongoose.Types.ObjectId,required:true},
    status:{type:String,default:'ordered'}
})

export const orderModel=mongoose.model('orders',orderShcema);