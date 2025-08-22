import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(collectionGroup(db, "products"));
        const snapshot = await getDocs(q);
        const filtered = snapshot.docs
          .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
          .filter(p =>
            p.name.toLowerCase().includes(searchQuery) ||
            (p.category && p.category.toLowerCase().includes(searchQuery))
          );
        setProducts(filtered);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) fetchProducts();
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="border p-4 rounded-lg shadow-md">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-orange-600 font-bold">₹{product.price}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
