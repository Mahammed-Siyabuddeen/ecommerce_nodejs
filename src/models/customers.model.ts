import mongoose, { Document } from "mongoose";
interface ICustomer {
    _id: mongoose.ObjectId,
    first_name: string,
    email: string,
    auth_type:string
    last_name?: string,
    phone_number?: Array<string>,
    password?: string,
}

const customerSchema = new mongoose.Schema<ICustomer>({
    email: { type: String, required: true },
    auth_type: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, },
    password: { type: String},
    phone_number: { type: [String] },
})

export const CustomerModel = mongoose.model("customers1", customerSchema);

