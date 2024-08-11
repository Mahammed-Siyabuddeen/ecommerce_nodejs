import mongoose from "mongoose";


const cartItemSchema=new mongoose.Schema({
    cart_id:{type:mongoose.Types.ObjectId,required:true},
    product_id:{type:mongoose.Types.ObjectId,required:true},
    quantity:{type:Number,required:true}
    
})

export const cartItemModel=mongoose.model('cartitems',cartItemSchema)