// user register and login
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create new user
    const newUser = await User.create({
      email,
      password,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      return res.status(201).json({
        success: true,
        message: "Registration successful",
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      });
    } else {
      return res.status(400).json({ error: "Registration error" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(401).json({
        success: false,
        message: "user not registered",
      });
    }

    if (password !== userExists.password) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    generateToken(userExists._id, res);

    return res.status(201).json({
      success: true,
      message: "Login successful",
      user: {
        id: userExists._id,
        email: userExists.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
