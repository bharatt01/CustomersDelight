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
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
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
    <section className="relative py-20 px-6 lg:px-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Heading */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Our Featured Stores
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the best stores curated for quality, design, and unique products.
        </p>
      </div>

      {/* Store Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading stores...</p>
      ) : stores.length === 0 ? (
        <p className="text-center text-gray-500">
          No stores available at the moment.
        </p>
      ) : (
        <div className="relative z-10 max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={store.imageUrl || "/placeholder.jpg"}
                  alt={store.name || "Store"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow">
                  {store.name || "Unnamed Store"}
                </h3>
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1 p-6">
                <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                  {store.description || "No description available."}
                </p>
                <Link
                  to={store.slug ? `/${store.slug}` : "#"}
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
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
