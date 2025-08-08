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
          // Only include stores that have required fields
          .filter((store) => store.name && store.slug);

        setStores(storeList);
      } catch (error) {
        console.error("Error fetching stores:", error.message);
        setStores([]); // optional: clear stores if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="py-10 bg-[#fefefe] px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">🏪 Our Stores</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading stores...</p>
      ) : stores.length === 0 ? (
        <p className="text-center text-gray-500">No stores available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4"
            >
              <img
                src={store.imageUrl || "/placeholder.jpg"}
                alt={store.name || "Store"}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-semibold">
                {store.name || "Unnamed Store"}
              </h3>
              <p className="text-gray-600 line-clamp-3">
                {store.description || "No description available."}
              </p>
              <Link
                to={store.slug ? `/${store.slug}` : "#"}
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View Store
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stores;
