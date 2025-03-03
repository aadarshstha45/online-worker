import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../../config/env.js";

export const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
