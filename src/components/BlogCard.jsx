import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const BlogCard = ({ blog }) => {
  // Strip HTML tags for preview
  const cleanText = DOMPurify.sanitize(blog.content, { ALLOWED_TAGS: [] });

  return (
    <Link to={`/blog/${blog.slug}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{cleanText}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
