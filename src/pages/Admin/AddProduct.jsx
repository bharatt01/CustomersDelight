import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const CLOUDINARY_UPLOAD_PRESET = "CustomersDelight";
const CLOUD_NAME = "dc4hshi8o";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "stores"), where("email", "==", user.email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setStoreId(snapshot.docs[0].id);
      }
    };
    fetchStore();
  }, []);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeId || !productName || !price || !category || imageFiles.length === 0) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }

    setLoading(true);
    try {
      const uploadedImageUrls = [];
      for (const file of imageFiles) {
        const imageUrl = await uploadImageToCloudinary(file);
        uploadedImageUrls.push(imageUrl);
      }

      const productRef = collection(db, "stores", storeId, "products");
      await addDoc(productRef, {
        name: productName,
        price: parseFloat(price),
        category,
        images: uploadedImageUrls,
        createdAt: new Date(),
      });

      alert("Product added successfully!");
      setProductName("");
      setPrice("");
      setCategory("men");
      setImageFiles([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price (₹)"
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <input
          type="file"
          accept="image/*"
          multiple
          className="w-full border border-gray-300 p-3 rounded-xl cursor-pointer"
          onChange={(e) => setImageFiles([...e.target.files])}
        />

        {imageFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {imageFiles.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded-xl border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
