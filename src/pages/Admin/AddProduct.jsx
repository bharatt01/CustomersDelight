import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const CLOUDINARY_UPLOAD_PRESET = "CustomersDelight";
const CLOUD_NAME = "dc4hshi8o";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("men");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [storeId, setStoreId] = useState(null);

  // 🔍 Fetch storeId by matching current user email
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
    if (!storeId || !productName || !price || !description || !category || !imageFile) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(imageFile);

      const productRef = collection(db, "stores", storeId, "products");

      await addDoc(productRef, {
        name: productName,
        price: parseFloat(price),
        description,
        category,
        imageUrl,
        createdAt: new Date(),
      });

      alert("Product added successfully!");
      setProductName("");
      setPrice("");
      setDescription("");
      setCategory("men");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price (₹)"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
