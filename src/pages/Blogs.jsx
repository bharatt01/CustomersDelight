import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import BlogCard from "../components/BlogCard";
import Navbar from './../components/Navbar'
import Footer from './../components/Footer'

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
    <Footer></Footer>
    </>
  );
};

export default Blogs;
