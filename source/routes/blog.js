import express from "express";
import {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/", blog_index);
router.get("/create", blog_create_get);
router.post("/", blog_create_post);
router.get("/:id", blog_details);
router.delete("/:id", blog_delete);

export default router;

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
