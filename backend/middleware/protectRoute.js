import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorizdd - no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.newUserId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    console.log("Error in protect route middleware", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
