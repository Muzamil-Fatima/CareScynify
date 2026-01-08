import jwt from "jsonwebtoken";

const generateToken = (res, useId) => {
  const token = jwt.sign({ id: useId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  //   set JWT token in HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;
