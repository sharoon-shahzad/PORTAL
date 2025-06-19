import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
      });
    }
    req.company = await Company.findById(decoded.id).select("-password");
    if (!req.company) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, company not found",
      });
    }
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
