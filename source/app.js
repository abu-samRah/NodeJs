import express from "express";
import path from "path";
import morgan from "morgan";
import blogRouts from "./v1/routes/blog.js";
import authRouts from "./v1/routes/authentication.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDB } from "./helpers/DB.js";
import { requireAuth, checkUser } from "./middleware/auth.js";

const app = express();

dotenv.config();

connectToDB()
  .then(() => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));

const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/source/views"));

// for logging request details
app.use(morgan("dev"));

app.use(express.static("public"));

app.use(express.urlencoded({ urlencoded: true, extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("*", checkUser);

app.get("/", (_, res) => {
  res.redirect("/api/v1/blogs");
});

app.get("/about", (_, res) => {
  res.render("about", { title: "about" });
});

app.get("/about-us", (_, res) => {
  res.redirect("/about");
});

app.use("/api/v1", authRouts);

app.use("/api/v1/blogs", requireAuth, blogRouts);

app.use((_, res) => {
  res.status(404).render("404", { title: "404", blogs: [] });
});
