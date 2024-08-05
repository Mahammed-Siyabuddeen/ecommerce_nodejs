import mongoose from "mongoose";


const productSchema=new mongoose.Schema(
    {
            name:{type:String,required:true},
            description:{type:String,required:true},
            price:{type:Number,required:true},
            mrp:{type:Number,required:true},
            category_id:{type:mongoose.Types.ObjectId,required:true},
            stock_quantity:{type:Number,required:true},
            created_at:{type:Date,default:new Date()},
            imagesUrl:{type:[String], required:true}
    }       
)
export const productModel=mongoose.model('Products',productSchema)