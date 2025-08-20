import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) setBlog(snapshot.docs[0].data());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading)
    return <div className="text-center py-16">Loading...</div>;
  if (!blog)
    return (
      <div className="text-center py-16 text-red-500">
        Blog not found.
      </div>
    );

  const createdDate = blog.createdAt
    ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
    : "Unknown Date";

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 text-gray-500 text-sm">
          <span>
            By <span className="font-semibold text-gray-700">{blog.author}</span>
          </span>
          <span>•</span>
          <span>{createdDate}</span>
        </div>

        {blog.imageUrl && (
          <div className="overflow-hidden rounded-xl shadow-md mb-10">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        <article
          className="prose prose-lg prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></article>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
