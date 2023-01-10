import express from "express";
import mongoose from "mongoose";
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import checkAuth from "./utils/checkAuth.js";
import { MONGODB_URL } from "./constants.js";

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("DB ok"))
  .catch((err) => console.error("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running!");
});
