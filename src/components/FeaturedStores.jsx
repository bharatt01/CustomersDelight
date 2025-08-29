import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LazyImage from "./LazyImage";
import './featuredstores.css'
// Skeleton loader for stores
const StoreSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col animate-pulse border border-gray-200">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 w-2/3 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-300 rounded mt-auto"></div>
      </div>
    </div>
  );
};

const FeaturedStores = ({ limit = 4 }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const q = query(collection(db, "stores"), where("featured", "==", true));
        const querySnapshot = await getDocs(q);
        const storesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStores(storesData);
      } catch (error) {
        console.error("Error fetching featured stores: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const displayedStores = stores.slice(0, limit);

  return (
    <div className="relative p-8 bg-gray-50 overflow-hidden">

      {/* Subtle Background Blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-red-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>

      {/* Soft Spark Particles */}
      <div className="absolute w-full h-full pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, idx) => (
          <span
            key={idx}
            className="absolute rounded-full w-1.5 h-1.5 opacity-40 bg-yellow-200 animate-spark"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Elegant Left-aligned Heading */}
      <div className="flex items-center mb-12 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-red-600 relative">
          Featured Stores
          <span className="absolute -inset-1 bg-gradient-to-r from-orange-200 via-red-200 to-orange-100 blur-xl opacity-25 rounded-lg animate-pulse-slow"></span>
        </h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-red-600 rounded-full relative overflow-hidden ml-4">
          <span className="absolute left-0 top-0 h-full w-1/3 bg-white opacity-20 animate-pulse-slow"></span>
        </div>
      </div>


  {/* Left-aligned Heading with Shimmer Light Rays */}



  {loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
      {Array.from({ length: limit }).map((_, idx) => (
        <StoreSkeleton key={idx} />
      ))}
    </div>
  ) : stores.length === 0 ? (
    <p className="text-center text-gray-600 relative z-10">No featured stores yet</p>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {displayedStores.map((store) => (
          <div
            key={store.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <LazyImage
                src={store.imageUrl || "https://via.placeholder.com/400"}
                alt={store.name}
                className="w-full h-56 object-cover rounded-t-2xl img"
              />
              <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Featured
              </span>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                {store.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                {store.description || "No description available"}
              </p>
              <Link
                to={`/${store.slug}`}
                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full 
                           bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm
                           shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                View Store <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {stores.length > limit && (
        <div className="flex justify-center mt-10 relative z-10">
          <button
            onClick={() => navigate("/featured-stores")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-400 text-white text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View More Stores
          </button>
        </div>
      )}
    </>
  )}
</div>

  );
};

export default FeaturedStores;
