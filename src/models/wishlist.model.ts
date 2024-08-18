import mongoose from "mongoose";


const wishListSchema=new mongoose.Schema({
    user_id:{type:mongoose.Types.ObjectId,required:true},
    product_id:{type:mongoose.Types.ObjectId,required:true},
})

export const wishListModel=mongoose.model('wishlist',wishListSchema);
