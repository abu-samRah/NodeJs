import Blog from "../models/blog.js";

export const blog_index = (_, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render("blogs/index", { title: "All Blogs", blogs }))
    .catch((err) => console.log(err));
};

export const blog_details = (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then((blog) =>
      res.render("blogs/details", { title: "Blog Details", blog })
    )
    .catch(() => res.status(404).render("404", { title: "Blog Not Found" }));
};

export const blog_create_get = (_, res) => {
  res.render("blogs/create", { title: "create" });
};

export const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

export const blog_delete = (req, res) => {
  const blogId = req.params.id;
  Blog.findByIdAndDelete(blogId)
    .then(() => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
};
