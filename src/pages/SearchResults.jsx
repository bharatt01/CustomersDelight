import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() || "";
  const navigate = useNavigate();

  const [matchedStores, setMatchedStores] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const storeSnap = await getDocs(collection(db, "stores"));

      // Filter matching stores
      const storeMatches = storeSnap.docs
        .filter((doc) => {
          const data = doc.data();
          return (
            data.name?.toLowerCase().includes(searchQuery) ||
            data.description?.toLowerCase().includes(searchQuery) ||
            data.slug?.toLowerCase().includes(searchQuery)
          );
        })
        .map((doc) => ({ id: doc.id, ...doc.data() }));

      setMatchedStores(storeMatches);

      // Loop through each store to get their products subcollection
      let allProductMatches = [];

      for (let storeDoc of storeSnap.docs) {
        const storeId = storeDoc.id;
        const storeSlug = storeDoc.data().slug; // get slug
        const productsRef = collection(db, "stores", storeId, "products");
        const productSnap = await getDocs(productsRef);

        const filteredProducts = productSnap.docs
          .filter((doc) => {
            const data = doc.data();
            return (
              data.name?.toLowerCase().includes(searchQuery) ||
              data.description?.toLowerCase().includes(searchQuery) ||
              data.category?.toLowerCase().includes(searchQuery)
            );
          })
          .map((doc) => ({
            id: doc.id,
            storeId,
            storeSlug, // include slug
            ...doc.data(),
          }));

        allProductMatches.push(...filteredProducts);
      }

      setMatchedProducts(allProductMatches);
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">
          Search results for: <span className="text-orange-500">“{searchQuery}”</span>
        </h2>

        {/* Stores */}
        {matchedStores.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Matching Stores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {matchedStores.map((store) => (
                <div
                  key={store.id}
                  onClick={() => navigate(`/${store.slug}`)}
                  className="border rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
                >
                  <img
                    src={store.imageUrl || "/placeholder.png"}
                    alt={store.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{store.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{store.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        {matchedProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Matching Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {matchedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-2"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{product.name}</h4>
                    <p className="text-sm text-gray-700 mb-1">₹{product.price}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>

                    <button
                      onClick={() => navigate(`/${product.storeSlug}`)}
                      className="mt-3 bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600 transition"
                    >
                      View in Store
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {matchedStores.length === 0 && matchedProducts.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            <p>No results found for “{searchQuery}”.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
