import mongoose from "mongoose";
import bcrypt from "bcrypt";
import CONSTANTS from "../constants/index.js";

export const connectToDB = () => {
  const dbURI = process.env.DB_URI;
  return mongoose.connect(dbURI);
};

export const handleErrors = (err) => {
  let errors = {};

  //duplicate error code
  if (err.code === CONSTANTS.duplicateErrorCode) {
    errors.email = "Email already exists, please use another email";
    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
