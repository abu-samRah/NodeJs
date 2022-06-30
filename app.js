const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRouts = require("./routes/blog");

const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://Abdallah:EUGRypXWhkh6C2sZ@nodehero.lwlvq.mongodb.net/Node_hero?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((results) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// for logging request details
app.use(morgan("dev"));

// for specifying public files that are accessible from the browser
app.use(express.static("public"));

// takes all the url encoded data and pass it to the req.body so we can use it
app.use(express.urlencoded({ urlencoded: true }));

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
app.use("/blogs", blogRouts);

// Express handle routes from top to the bottom
// use function is a middleware that runs at every request weather its a get, post, delete, etc...
// middleware functions stops when we send a response
app.use((_, res) => {
  res.status(404).render("404", { title: "404", blogs: [] });
});
