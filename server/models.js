import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export const User = new mongoose.model("users", userSchema);
