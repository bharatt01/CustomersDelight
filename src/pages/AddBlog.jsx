import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CLOUDINARY_UPLOAD_PRESET = "CustomersDelight"; 
const CLOUD_NAME = "dc4hshi8o"; 

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) navigate("/blog-admin/login");
  }, [navigate]);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!imageFile) {
        setMessage("❌ Please select an image.");
        setLoading(false);
        return;
      }

      const imageUrl = await handleImageUpload();
      const blogSlug = slug || generateSlug(title);

      await addDoc(collection(db, "blogs"), {
        title,
        slug: blogSlug,
        author,
        content,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Blog added successfully!");
      setTitle("");
      setSlug("");
      setAuthor("");
      setContent("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding blog:", error);
      setMessage("❌ Error adding blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteDoc(doc(db, "blogs", id));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully.");
      navigate("/adminlogin");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {message && (
        <p className="mb-4 text-center text-green-600 font-medium">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border px-4 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Slug (optional)"
          className="w-full border px-4 py-2 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author Name"
          className="w-full border px-4 py-2 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="bg-white"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Add Blog"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Recently Uploaded Blogs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between"
          >
            <div>
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-bold mb-2">{blog.title}</h4>
              <p className="text-sm text-gray-500">
                {blog.author} | {blog.slug}
              </p>
            </div>
            <button
              onClick={() => handleDelete(blog.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlog;
