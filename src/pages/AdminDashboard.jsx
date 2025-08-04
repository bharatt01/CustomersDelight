import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useParams } from "react-router-dom";
import { Trash2, PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // for unique file names
import Navbar from "../components/Navbar";
// import { getStorage } from "firebase/storage";

const AdminDashboard = () => {
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    imageFile: null,
  });

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, `stores/${storeId}/products`));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(list);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.imageFile) return;

    const imageRef = ref(storage, `stores/${storeId}/${uuidv4()}`);
    await uploadBytes(imageRef, newProduct.imageFile);
    const downloadURL = await getDownloadURL(imageRef);

    await addDoc(collection(db, `stores/${storeId}/products`), {
      name: newProduct.name,
      description: newProduct.description,
      image: downloadURL,
    });

    setNewProduct({ name: "", description: "", imageFile: null });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `stores/${storeId}/products`, id));
    fetchProducts();
  };

  useEffect(() => {
    if (storeId) fetchProducts();
  }, [storeId]);

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🛒 Admin Dashboard — {storeId}
        </h1>

        {/* Add Product */}
        <form onSubmit={handleAdd} className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mb-10">
          <input
            type="text"
            placeholder="Product Name"
            className="px-4 py-2 border rounded-xl shadow-sm focus:ring focus:ring-indigo-200"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="px-4 py-2 border rounded-xl shadow-sm bg-white"
            onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files[0] })}
            required
          />
          <input
            type="text"
            placeholder="Short Description"
            className="px-4 py-2 border rounded-xl shadow-sm"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center font-semibold transition py-2"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </form>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No products found for this store.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
