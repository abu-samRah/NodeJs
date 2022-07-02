import mongoose from "mongoose";

export const connectToDB = () => {
  const dbURI = process.env.DB_URI;
  return mongoose.connect(dbURI);
};
