import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.j7sj8ll.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.error("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    res.json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "User registration error!",
    });
  }
});

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running!");
});
