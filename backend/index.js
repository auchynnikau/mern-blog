import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
} from "./validations.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";
import { MONGO_URL } from "./constants.js";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("DB ok"))
  .catch((err) => console.error("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (reg, file, callback) => {
    callback(null, "uploads");
  },
  filename: (reg, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is running!");
});
