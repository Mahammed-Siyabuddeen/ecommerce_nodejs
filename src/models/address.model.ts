import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipcode: { type: String, required: true },
    phone: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true }
})

export const addressModel=mongoose.model('address',addressSchema);