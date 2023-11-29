import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log("Hashed password:", hash);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    
    console.log("New user data:", newUser);

    await newUser.save()
    res.status(200).send("User has been created.")
  } catch (err) {
    console.error("Error in register:", err);
    if (err.code === 11000) {
      res.status(400).send("Username or email already exists.");
    } else {
      next(err)
      res.status(500).send("Internal Server Error");
    }
    
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details:{...otherDetails}, isAdmin });
  } catch (err) {
    next(err);
  }
};