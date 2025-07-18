import { body } from "express-validator";

export const signupValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("fullName").notEmpty().withMessage("UserName is required"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      try {
        if (value !== req.body.password) {
          throw new Error("Confirm Password not Matched");
        }
        return true;
      } catch (error) {}
    }),
];
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("password").trim().notEmpty().withMessage("Password is Required."),
];
