import Blog from "../models/blog.js";

export const getAllBlogs = (_, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render("blogs/index", { title: "All Blogs", blogs }))
    .catch((err) => console.log(err));
};

export const getOneBlog = (req, res) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId)
    .then((blog) =>
      res.render("blogs/details", { title: "Blog Details", blog })
    )
    .catch(() => res.status(404).render("404", { title: "Blog Not Found" }));
};

export const getCreateBlogPage = (_, res) => {
  res.render("blogs/create", { title: "create" });
};

export const createNewBlog = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

export const deleteOneBlog = (req, res) => {
  const blogId = req.params.blogId;
  Blog.findByIdAndDelete(blogId)
    .then(() => res.json({ redirect: "/" }))
    .catch((err) => console.log(err));
};
