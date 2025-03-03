import mongoose, { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  image: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  userId: {
    type: _Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Category = model("Category", categorySchema);
