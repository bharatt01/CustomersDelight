import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";

const StoreDetail = () => {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchStoreAndProducts = async () => {
      try {
        const storesRef = collection(db, "stores");
        const q = query(storesRef, where("slug", "==", slug));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setNotFound(true);
          return;
        }

        const storeData = snapshot.docs[0];
        const storeId = storeData.id;
        const storeObj = { id: storeId, ...storeData.data() };
        setStore(storeObj);

        const productsRef = collection(db, "stores", storeId, "products");
        const productsSnapshot = await getDocs(productsRef);
        const productList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Error fetching store/products:", error);
        setNotFound(true);
      }
    };

    fetchStoreAndProducts();
  }, [slug]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered =
      category === "All"
        ? products
        : products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === "lowToHigh") return a.price - b.price;
      if (order === "highToLow") return b.price - a.price;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  if (notFound) return <div className="p-10 text-center text-red-500">Store not found</div>;
  if (!store) return <div className="p-10 text-center">Loading...</div>;

  const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <>
      <Navbar />

      {/* Store Banner */}
      <div className="relative w-full h-[90vh]">
        <img
          src={store.imageUrl}
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 flex flex-col justify-center items-center text-white text-center p-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{store.name}</h1>
          <p className="max-w-3xl text-lg md:text-xl text-gray-200">{store.description}</p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border px-4 py-2 rounded-md shadow-sm text-gray-700 text-sm w-full md:w-auto"
          >
            <option value="default">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products to display.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-green-600 font-bold text-lg mt-1 mb-2">₹{product.price}</p>
                  <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                  <a
                    href={`https://wa.me/91${store.phoneNumber}?text=Hi, I’m interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition font-medium"
                  >
                    WhatsApp to Buy
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default StoreDetail;
