import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "../controllers/UserController.js";

const MONGODB_URL =
  "mongodb+srv://admin:admin@cluster0.j7sj8ll.mongodb.net/blog?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("DB ok"))
  .catch((err) => console.error("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running!");
});
