  import React, { useEffect, useState } from "react";
  import { db } from "../firebase";
  import { collection, getDocs } from "firebase/firestore";
 import LazyImage from "../components/LazyImage";
  import BlogCard from "../components/BlogCard";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "blogs"));
          const blogsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBlogs(blogsData);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlogs();
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow flex justify-center items-center">
            <p className="text-xl font-semibold">Loading blogs...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Top Banner / Strip */}
        <div
          className="w-full  h-[60vh] md:h-[50vh]  flex items-center justify-center bg-cover bg-center relative"
          style={{
            backgroundImage: `url('/Images/blogsheroimg.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
        </div>
{/* Blog Section */}
<div className="w-full px-4">
  {/* Section Heading */}
  <div className="text-center mt-12 mb-10">
    <div className="flex items-center justify-center w-full">
      {/* Left long line */}
      <span className="flex-1 h-[2px] bg-orange-500 rounded-full mx-2"></span>

      {/* Heading */}
      <h2 className="px-3 text-3xl md:text-5xl font-extrabold text-gray-800 whitespace-nowrap">
        Latest Blogs
      </h2>

      {/* Right long line */}
      <span className="flex-1 h-[2px] bg-orange-500 rounded-full mx-2"></span>
    </div>

    <p className="text-gray-600 mt-4 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
      Discover our latest updates, tips, and insights
    </p>
  </div>

  {/* Blog Grid */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    {blogs.length > 0 ? (
      blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
    ) : (
      <p className="text-center text-lg col-span-full">No blogs found.</p>
    )}
  </div>
</div>



        <Footer />
      </div>
    );
  };

  export default Blogs;
