import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const snapshot = await getDocs(collection(db, "stores"));
        const storeList = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((store) => store.name && store.slug);
        setStores(storeList);
      } catch (error) {
        console.error("Error fetching stores:", error.message);
        setStores([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  return (
    <section className="relative py-20 px-6 lg:px-12 bg-white">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Our Featured Stores
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover unique stores curated for style, quality, and creativity.
        </p>
      </div>

      {/* Store Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading stores...</p>
      ) : stores.length === 0 ? (
        <p className="text-center text-gray-500">No stores available at the moment.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-2 bg-gradient-to-b from-orange-50 to-orange-100 border border-orange-200"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-t-3xl">
                <img
                  src={store.imageUrl || "/placeholder.jpg"}
                  alt={store.name || "Store"}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg z-10">
                  {store.name || "Unnamed Store"}
                </h3>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-800 text-sm line-clamp-3 mb-6">
                  {store.description || "No description available."}
                </p>
                <Link
                  to={store.slug ? `/${store.slug}` : "#"}
                  className="mt-auto inline-flex w-full items-center justify-center px-8 py-4 rounded-full bg-white text-orange-600 font-extrabold text-lg shadow-lg hover:bg-orange-600 hover:text-white transition-all duration-300"
                >
                  View Store
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Stores;
  