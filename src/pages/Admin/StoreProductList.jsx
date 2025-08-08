import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const StoreProductList = () => {
  const [products, setProducts] = useState([]);
  const [storeId, setStoreId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const storeQuery = query(collection(db, "stores"), where("email", "==", currentUser.email));
      const storeSnapshot = await getDocs(storeQuery);

      if (storeSnapshot.empty) return;

      const storeDoc = storeSnapshot.docs[0];
      const storeId = storeDoc.id;
      setStoreId(storeId);

      const productQuery = await getDocs(collection(db, `stores/${storeId}/products`));
      const productList = productQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!storeId) return;
    await deleteDoc(doc(db, `stores/${storeId}/products/${productId}`));
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleEdit = async (productId) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    await updateDoc(doc(db, `stores/${storeId}/products/${productId}`), {
      name: newName,
    });
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, name: newName } : p))
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-3 rounded shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p>₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-xs text-gray-400">Category: {product.category}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreProductList;
