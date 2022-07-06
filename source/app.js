import express from "express";
import path from "path";
import morgan from "morgan";
import blogRouts from "./routes/blog.js";
import authRouts from "./routes/authentication.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDB } from "./utils/index.js";
import { requireAuth, checkUser } from "./middleware/authMiddleware.js";

const app = express();

// configuring our env
dotenv.config();

// connect to mongodb
connectToDB()
  .then(() => {
    console.log("######################################################");
    console.log("success");
    console.log("######################################################");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("******************************************************");
    console.log("bad");
    console.log(err);
    console.log("******************************************************");
  });

// register view engine
const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/source/views"));

// for logging request details
app.use(morgan("dev"));

// for specifying public files that are accessible from the browser
app.use(express.static("public"));

// takes all the url encoded data and pass it to the req.body so we can use it
app.use(express.urlencoded({ urlencoded: true, extended: false }));
app.use(express.json());
app.use(cookieParser());

// get the user details on each get request
app.get("*", checkUser);

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about", blogs: [] });
});

app.get("/about-us", (req, res) => {
  res.redirect("about");
});

// blog routes
app.use("/blogs", requireAuth, blogRouts);

// auth routes
app.use(authRouts);

// Express handle routes from top to the bottom
// use function is a middleware that runs at every request weather its a get, post, delete, etc...
// middleware functions stops when we send a response
app.use((_, res) => {
  res.status(404).render("404", { title: "404", blogs: [] });
});
