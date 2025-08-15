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

      const storeQuery = query(
        collection(db, "stores"),
        where("email", "==", currentUser.email)
      );
      const storeSnapshot = await getDocs(storeQuery);

      if (storeSnapshot.empty) return;

      const storeDoc = storeSnapshot.docs[0];
      const storeId = storeDoc.id;
      setStoreId(storeId);

      const productQuery = await getDocs(
        collection(db, `stores/${storeId}/products`)
      );
      const productList = productQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

  const toggleField = async (productId, field, value) => {
    try {
      await updateDoc(doc(db, `stores/${storeId}/products/${productId}`), {
        [field]: value,
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, [field]: value } : p
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const setOffer = async (productId) => {
    const offer = prompt("Enter offer (e.g., 20% Off):");
    if (offer === null) return; // cancel
    await toggleField(productId, "offer", offer);
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
              <p className="text-xs text-gray-400">
                Category: {product.category}
              </p>

              {/* ✅ Display tags */}
              <div className="mt-2 space-x-2 text-sm">
                {product.featured && (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                {product.deal && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    Deal
                  </span>
                )}
                {product.offer && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {product.offer}
                  </span>
                )}
              </div>

              {/* ✅ Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
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
                <button
                  onClick={() =>
                    toggleField(product.id, "featured", !product.featured)
                  }
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm"
                >
                  {product.featured ? "Unfeature" : "Feature"}
                </button>
                <button
                  onClick={() =>
                    toggleField(product.id, "deal", !product.deal)
                  }
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  {product.deal ? "Remove Deal" : "Mark as Deal"}
                </button>
                <button
                  onClick={() => setOffer(product.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  {product.offer ? "Change Offer" : "Set Offer"}
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
