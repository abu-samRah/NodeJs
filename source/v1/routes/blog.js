import express from "express";
import {
  getAllBlogs,
  getOneBlog,
  getCreateBlogPage,
  createNewBlog,
  deleteOneBlog,
} from "../../controllers/blog.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/create", getCreateBlogPage);
router.post("/", createNewBlog);
router.get("/:blogId", getOneBlog);
router.delete("/:blogId", deleteOneBlog);

export default router;

// mongoose and mongo sandbox routes for practise
router.get("/add-blog", (_, res) => {
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

router.get("/all-blogs", (_, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.get("/single-blog", (_, res) => {
  Blog.findById("62bda65162463bf00e594072")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
