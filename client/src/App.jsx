import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import BlogPage from "./pages/Blogs";
import BlogIdPage from "./pages/BlogId";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AddBlogPage from "./pages/AddBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogIdPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/addblog" element={<AddBlogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
