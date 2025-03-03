import { connect } from "mongoose";
import { MONGO_URI } from "../../config/env.js";

async function db() {
  try {
    await connect(MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.log(error);
  }
}

export default db;
