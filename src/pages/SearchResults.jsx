import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import LazyImage from "../components/LazyImage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Skeleton Card for loading
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-lg animate-pulse overflow-hidden">
    <div className="w-full h-64 bg-gray-300" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
      <div className="h-3 bg-gray-300 rounded w-full" />
      <div className="h-8 bg-gray-300 rounded mt-2" />
    </div>
  </div>
);

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() || "";
  const navigate = useNavigate();

  const [matchedStores, setMatchedStores] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

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

      let allProductMatches = [];
      for (let storeDoc of storeSnap.docs) {
        const storeId = storeDoc.id;
        const storeSlug = storeDoc.data().slug;
        const storePhone = storeDoc.data().phoneNumber;

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
            storeSlug,
            storePhone,
            ...doc.data(),
          }));

        allProductMatches.push(...filteredProducts);
      }

      setMatchedProducts(allProductMatches);
      setLoading(false);
    };

    fetchResults();
  }, [searchQuery]);

  const renderSkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">
          Search results for:{" "}
          <span className="text-orange-500">“{searchQuery}”</span>
        </h2>

        {loading ? (
          <>
            <h3 className="text-xl font-semibold mb-4">Matching Stores</h3>
            {renderSkeletonGrid()}

            <h3 className="text-xl font-semibold mb-4 mt-8">Matching Products</h3>
            {renderSkeletonGrid()}
          </>
        ) : (
          <>
            {/* Stores */}
            {matchedStores.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Matching Stores</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {matchedStores.map((store) => (
                    <div
                      key={store.id}
                      onClick={() => navigate(`/${store.slug}`)}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden"
                    >
                      <LazyImage
                        src={store.imageUrl || "/placeholder.png"}
                        alt={store.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-5">
                        <h4 className="font-bold text-lg">{store.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {store.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
          {/* Products Section (Search Results) */}
{matchedProducts.length === 0 ? (
  <p className="text-center text-gray-500">No products found.</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {matchedProducts.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col"
      >
        {/* Product Image */}
        <div className="relative w-full h-64">
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : "https://via.placeholder.com/400"
            }
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                Special Offer
              </span>
            )}
            {product.deal && (
              <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                DEAL
              </span>
            )}
            {product.offer && (
              <span className="bg-cyan-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                {product.offer}
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-gray-800 font-semibold mb-2">₹{product.price}</p>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
            {product.description || "No description available."}
          </p>

          {/* WhatsApp Buy Button (if store phone exists) */}
          {product.storePhone && (
            <a
              href={`https://wa.me/91${product.storePhone}?text=Hi, I’m interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-bold shadow-md hover:shadow-lg transition duration-300 text-center"
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
)}


            {/* Empty State */}
            {matchedStores.length === 0 && matchedProducts.length === 0 && (
              <div className="text-center text-gray-600 mt-10">
                <p>No results found for “{searchQuery}”.</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
