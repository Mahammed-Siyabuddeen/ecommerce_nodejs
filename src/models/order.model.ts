import mongoose from "mongoose";


const orderShcema=new mongoose.Schema({
    user_id:{type:mongoose.Types.ObjectId,required:true},
    address_id:{type:mongoose.Types.ObjectId,required:true},
    payment_id:{type:mongoose.Types.ObjectId,required:true},
    total_amount:{type:Number,required:true},
    status:{type:String,default:'ordered'},
    create_at:{type:Date,default:new Date()},
})

export const orderModel=mongoose.model('orders',orderShcema);