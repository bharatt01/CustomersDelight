import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(blogsQuery);
        const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllBlogs(blogs);

        const current = blogs.find(b => b.slug === slug);
        setBlog(current || null);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [slug]);

  // Scroll to top on blog change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const currentIndex = allBlogs.findIndex(b => b.slug === slug);
  const prevBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;

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

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 flex-col sm:flex-row gap-4">
          {prevBlog ? (
            <button
              onClick={() => navigate(`/blog/${prevBlog.slug}`)}
              className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              ← Previous: <span className="font-medium">{prevBlog.title}</span>
            </button>
          ) : <div className="flex-1" />}

          {nextBlog ? (
            <button
              onClick={() => navigate(`/blog/${nextBlog.slug}`)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:shadow-xl transition duration-300 font-semibold hover:bg-blue-700"
            >
              Next: <span className="font-medium">{nextBlog.title}</span> →
            </button>
          ) : <div className="flex-1" />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
