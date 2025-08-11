import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { genSalt, hash } from "bcryptjs";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
        // Hash password with salt rounds of 12
        const salt = await genSalt(12);
        this.password = await hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Hash password before updating
UserSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        try {
            const salt = await genSalt(12);
            update.password = await hash(update.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const User = model('User', UserSchema);
export default User; 