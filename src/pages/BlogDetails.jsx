import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (!blog) return <div className="text-center py-16 text-red-500">Blog not found.</div>;

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Blog Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
        {blog.title}
      </h1>

      {/* Author and Date */}
      <div className="flex items-center gap-4 mb-8 text-gray-500 text-sm">
        <span>
          By <span className="font-semibold text-gray-700">{blog.author || "Unknown Author"}</span>
        </span>
        <span>•</span>
        <span>{blog.date || "Unknown Date"}</span>
      </div>

      {/* Blog Image */}
      {blog.imageUrl && (
        <div className="overflow-hidden rounded-xl shadow-md mb-10">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Blog Content with HTML rendering */}
      <article
        className="prose prose-lg prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></article>
    </div>
    <Footer></Footer>
    </>
  );
};

export default BlogDetail;
