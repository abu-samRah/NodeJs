const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render("blogs/index", { title: "All Blogs", blogs }))
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then((blog) =>
      res.render("blogs/details", { title: "Blog Details", blog })
    )
    .catch((err) => res.status(404).render("404", { title: "Blog Not Found" }));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "create" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  const blogId = req.params.id;
  Blog.findByIdAndDelete(blogId)
    .then((blog) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
