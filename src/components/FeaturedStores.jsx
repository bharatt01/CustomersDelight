import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

// Skeleton loader for stores
const StoreSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-6 w-2/3 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-300 rounded mt-auto"></div>
      </div>
    </div>
  );
};

const FeaturedStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Featured Stores
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, idx) => (
            <StoreSkeleton key={idx} />
          ))}
        </div>
      ) : stores.length === 0 ? (
        <p className="text-center text-gray-600">No featured stores yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300"
            >
              <img
                src={store.imageUrl || "https://via.placeholder.com/400"}
                alt={store.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {store.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {store.description || "No description available"}
                </p>
                <Link
                  to={`/${store.slug}`}
                  className="mt-auto inline-flex w-full items-center justify-center px-6 py-3 rounded-lg 
                             bg-gradient-to-r from-orange-500 to-red-500 text-white text-base 
                             shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  View Store
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedStores;
