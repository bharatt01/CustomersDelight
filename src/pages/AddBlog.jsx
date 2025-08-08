import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CLOUDINARY_UPLOAD_PRESET = "CustomersDelight"; // 🔁 Replace if needed
const CLOUD_NAME = "dc4hshi8o"; // 🔁 Replace if needed

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ✅ Redirect to login if not signed in
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  // ✅ Upload image to Cloudinary
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  // ✅ Submit blog to Firestore
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

      await addDoc(collection(db, "blogs"), {
        title,
        slug,
        category,
        content,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Blog added successfully!");
      setTitle("");
      setSlug("");
      setCategory("");
      setContent("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding blog:", error);
      setMessage("❌ Error adding blog. Check permissions.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Sign out handler
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
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add New Blog</h2>
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

      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Slug (unique-url)"
          className="w-full border px-4 py-2 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border px-4 py-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
    </div>
  );
};

export default AddBlog;
