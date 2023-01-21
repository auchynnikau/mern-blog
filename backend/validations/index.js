import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password's length should be more then 5 symbol").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password's length should be more then 5 symbol").isLength({
    min: 5,
  }),
  body("fullName", "Fill the name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar URL").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Type post heading").isLength({ min: 3 }).isString(),
  body("text", "Type post content").isLength({ min: 10 }).isString(),
  body("tags", "Invalid tags format").optional().isString(),
  body("imageUrl", "Invalid image URL").optional().isString(),
];
