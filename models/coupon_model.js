import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const CouponSchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    discount: { type: Number, required: true, min: 1, max: 100 },
    usageLimit: { type: Number, required: true, min: 1 },
    usageCount: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Coupon = model('Coupon', CouponSchema);
export default Coupon; 