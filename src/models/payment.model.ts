import mongoose from "mongoose";

const paymentSchema=new mongoose.Schema({
    amount:{type:Number,required:true},
    transaction_id:{type:String,required:true},
    create_at:{type:Date,default:new Date()},
})

export const paymentModel=mongoose.model('payment',paymentSchema);