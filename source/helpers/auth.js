import jwt from "jsonwebtoken";
import CONSTANTS from "../constants/index.js";

export const handleErrors = (err) => {
  let errors = {};

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not correct";
  }

  //incorrect password
  if (err.message === "incorrect password") {
    errors.email = "that password is not correct";
  }

  //duplicate error code
  if (err.code === CONSTANTS.DUPLICATE_ERROR_CODE) {
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

export const verifyToken = (token, onSuccess, onError) => {
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, _) => {
      if (err) {
        onError();
      } else {
        onSuccess();
      }
    });
  } else {
    onError();
  }
};

export const generateJWT = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: CONSTANTS.JWT_MAX_AGE,
  });
};
