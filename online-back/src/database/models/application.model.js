import mongoose, { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    job: {
      type: _Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: _Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending", // when a application is pending
        "accepted", // when a application is accepted
        "rejected", // when a application is rejected
        "finished", // when job is over
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Application = model("Application", applicationSchema);
