import mongoose from "mongoose";
import validator from "validator";
import { hashPassword, comparePasswords } from "../helpers/user.js";

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
userSchema.post("save", function (doc, next) {
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error("incorrect email");
  const auth = await comparePasswords(password, user.password);
  if (!auth) throw Error("incorrect password");
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
