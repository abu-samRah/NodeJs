const express = require("express");

const app = express();

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname }); // it infers the status_code & content_type
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname }); // it infers the status_code & content_type
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// Express handle routes from top to the bottom
app.use((_, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
