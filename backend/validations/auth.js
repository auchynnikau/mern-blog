import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid mail format").isEmail(),
  body("password", "Password's length should be more then 5 symbol").isLength({
    min: 5,
  }),
  body("fullName", "Fill the name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar URL").optional().isURL(),
];
