import mongoose from "mongoose";
import validator from "validator";
import { hashPassword } from "../utils/index.js";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
  next();
});

// fire a function after doc saved to db
userSchema.post("save", (doc, next) => {
  console.log("new user was created", doc);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
