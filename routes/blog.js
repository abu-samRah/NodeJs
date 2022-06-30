const express = require("express");
const blogController = require("../controllers/blog");

const router = express.Router();

router.get("/", blogController.blog_index);
router.get("/create", blogController.blog_create_get);
router.post("/", blogController.blog_create_post);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);

module.exports = router;

// mongoose and mongo sandbox routes for practise
router.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new Blog",
    snippet: "about my new blog",
    body: "more about my blog",
  });
  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.get("/single-blog", (req, res) => {
  Blog.findById("62bda65162463bf00e594072")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
