import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Featured.css';

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
    <div className="w-full h-64 bg-gray-200"></div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="mt-auto h-10 bg-gray-300 rounded-xl"></div>
    </div>
  </div>
);

const FeaturedProducts = ({ limit = 4 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const storesSnapshot = await getDocs(collection(db, "stores"));

        const productPromises = storesSnapshot.docs.map(async (storeDoc) => {
          const storeId = storeDoc.id;
          const storeData = storeDoc.data();

          const productsSnapshot = await getDocs(
            query(
              collection(db, `stores/${storeId}/products`),
              where("featured", "==", true)
            )
          );

          return productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            storeId,
            storeName: storeData.name,
            storePhone: storeData.phoneNumber,
            ...doc.data(),
          }));
        });

        const allResults = await Promise.all(productPromises);
        const allFeatured = allResults.flat();

        setProducts(allFeatured);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(limit)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No featured products yet.</p>;
  }

  const displayedProducts = products.slice(0, limit);

  return (
    <div className="p-8 bg-gray-50">
      {/* Heading */}
      <div className="relative flex flex-col items-center mb-16">
        <h2 className="featured-heading">
          Featured Products
        </h2>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-72 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full"></div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-72 h-1 bg-gradient-to-l from-cyan-400 via-blue-400 to-indigo-500 rounded-full"></div>
        <div className="mt-4 w-40 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 shadow-md"></div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:shadow-3xl transition-all duration-300 flex flex-col"
          >
            <div className="relative w-full h-64">
           <img
  src={(product.images && product.images[0]) || "https://via.placeholder.com/400"}
  alt={product.name}
  loading="lazy"
  className="absolute inset-0 w-full h-full object-cover"
  onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
/>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.featured && (
                  <span className="bg-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                    FEATURED
                  </span>
                )}
                {product.deal && (
                  <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                    DEAL
                  </span>
                )}
                {product.offer && (
                  <span className="bg-cyan-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                    {product.offer}
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <p className="text-sm text-gray-500 mb-1">{product.storeName}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-gray-800 font-semibold mb-2">₹{product.price}</p>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {product.description || "No description available."}
              </p>

              {/* WhatsApp Buy Button */}
              {product.storePhone && (
                <a
                  href={`https://wa.me/91${product.storePhone}?text=Hi, I’m interested in ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-gradient-to-r bg-orange-500 text-white py-2 px-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition duration-300 text-center"
                >
                  Buy Now
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {products.length > limit && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/featured-products")}
            className="bg-gradient-to-r from-red-500 to-orange-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition duration-300"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
