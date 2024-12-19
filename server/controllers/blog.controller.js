import mongoose from "mongoose";

import BlogU from "../modals/blog.modal.js";
import User from "../modals/user.modal.js";
import Comment from "../modals/comment.modal.js";

export async function createBlog(req, res) {
  try {
    const data = req.body;

    if (
      !data.username ||
      !data.img ||
      !data.title ||
      !data.slug ||
      !data.content
    ) {
      return res.status(400).send("Please fill your all details");
    }

    if (!mongoose.Types.ObjectId.isValid(data.username)) {
      return res.status(400).send("Please fill your all details");
    }

    const user = await User.findById(data.username);

    if (!user) {
      return res.status(403).send("You are not authorised");
    }

    const newblog = new BlogU({
      author: data.username,
      img: data.img,
      title: data.title,
      slug: data.slug,
      content: data.content,
    });

    await newblog.save();
    return res.status(200).send("succesfully created your blog");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export async function deleteBlog(req, res) {
  try {
    const data = req.params;
    if (!data.id) {
      return res.status(400).send("Please fill your all details");
    }
    await BlogU.findByIdAndDelete(data.id);

    return res.status(200).send("Your blog deleted succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export async function readBlog(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("Please fill your all details");
    }

    const blogbyId = await BlogU.findById(id)
      .populate("author")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });

    return res.status(200).json(blogbyId);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}
export async function readALLBlog(req, res) {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const size = parseInt(pageSize, 10);

    const skip = (pageNumber - 1) * size;

    const totalDocuments = await BlogU.countDocuments();

    const blogs = await BlogU.find().populate("author").skip(skip).limit(size);

    return res.status(200).json({
      totalDocuments,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalDocuments / size),
      pageSize: size,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}

export async function editBlog(req, res) {
  try {
    const data = req.body;

    if (!data.id) {
      return res.status(400).send("Please fill your all details");
    }

    if (!mongoose.Types.ObjectId.isValid(data.id)) {
      return res.status(400).send("Please fill your all details");
    }

    if (
      !data.username ||
      !data.img ||
      !data.title ||
      !data.slug ||
      !data.content
    ) {
      return res.status(400).send("Please fill your all details");
    }

    const user = await User.findById(data.username);

    if (!user) {
      return res.status(403).send("You are not authorised");
    }

    const blog = await BlogU.findById(data.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    blog.img = data.img;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.content = data.content;

    await blog.save();
    return res.status(200).send("sucessfully updated your Blog");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
}
