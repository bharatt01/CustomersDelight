import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600">Loading featured stores...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Featured Stores
      </h2>
      {stores.length === 0 ? (
        <p className="text-center text-gray-600">No featured stores yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
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
