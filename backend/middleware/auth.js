
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "./catchAsyncError.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // First check cookie
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // If no cookie, then check Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.userId = decoded.id;
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized, token failed" });
  }
});

export { protect };