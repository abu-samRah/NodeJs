const express = require("express");

const app = express();
// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "about", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about", blogs: [] });
});

app.get("/about-us", (req, res) => {
  res.redirect("about");
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "create", blogs: [] });
});

// Express handle routes from top to the bottom
app.use((_, res) => {
  res.status(404).render("404", { title: "404", blogs: [] });
});
