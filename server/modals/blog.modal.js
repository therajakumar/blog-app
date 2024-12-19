import mongoose from "mongoose";
const blogScehma = mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
});
const BlogU = mongoose.model("BlogU", blogScehma);
export default BlogU;
