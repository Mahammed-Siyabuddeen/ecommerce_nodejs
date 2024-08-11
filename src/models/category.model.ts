import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{type:String,required:true}
})

export const categoryModel= mongoose.model('category',categorySchema)