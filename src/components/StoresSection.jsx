import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import LazyImage from "./LazyImage";
const StoresSection = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const snapshot = await getDocs(collection(db, "stores"));
      const storeList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStores(storeList);
    };
    fetchStores();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🏪 Featured Stores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white p-4 shadow-lg rounded-xl">
          <LazyImage
              src={store.imageUrl}
              alt={store.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold">{store.name}</h3>
            <p className="text-gray-600">{store.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresSection;
