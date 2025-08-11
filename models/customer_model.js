import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Customer = model('Customer', CustomerSchema);
export default Customer; 