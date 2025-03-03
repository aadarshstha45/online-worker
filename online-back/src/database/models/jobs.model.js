import mongoose, { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    proposedFees: { type: String, required: true },
    problemDesc: { type: String, required: true },
    image: { type: [String], required: false },
    location: { type: String, required: true },
    createdBy: {
      type: _Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: _Schema.Types.ObjectId,
      ref: "Category",
      // required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

export const Job = model("Job", jobSchema);
