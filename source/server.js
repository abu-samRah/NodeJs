/*const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // set header content type
  res.setHeader("Content-Type", "text/html");

  // send html files
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.setHeader("Location", "/about");
      res.statusCode = 301;
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  read(path, res);
});

//"./views/index.html"

const read = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);

      res.end();
    } else {
      res.end(data);
    }
  });
};

server.listen(3000, "localhost", () => {
  console.log("listening for requests");
});
*/
