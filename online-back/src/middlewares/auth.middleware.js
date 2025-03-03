import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../config/env.js";
import { User } from "../database/models/users.model.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: false,
      error: "Authorization required.",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    if (JWT_SECRET) {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const { id } = decodedToken;

      if (!id) {
        return res.status(401).json({
          status: false,
          error: "Invalid token. Authorization denied.",
        });
      }
      const user = await User.findById(id);

      if (!user) {
        return res.status(401).json({
          status: false,
          error: "User not found. Authorization denied.",
        });
      }
      req.user = user;
      next();
    } else {
      return null;
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      error: "Invalid token. Authorization denied.",
    });
  }
};
