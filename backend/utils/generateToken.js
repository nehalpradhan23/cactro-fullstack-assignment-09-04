import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const newUserId = userId.toString();

  const token = jwt.sign({ newUserId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // prevent XSS cors site scripting
    sameSite: "strict", // CSRF attack (cross site request forgery)
    secure: process.env.NODE_ENV !== "development", // HTTPS
  });

  return token;
};

export default generateToken;
