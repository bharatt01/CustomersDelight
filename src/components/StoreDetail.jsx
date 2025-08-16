import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Share2, Phone } from "lucide-react";
import "./StoreDetail.css";

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

      {/* Banner Section */}
      <div className="w-full h-[50vh] relative">
        <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover" />
      </div>

      {/* Store Info */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{store.name}</h1>
            <p className="text-gray-600 mt-2">{store.description}</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href={`tel:${store.phoneNumber}`}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              <Phone size={18} /> Call
            </a>
            <button
              onClick={() => navigator.share ? navigator.share({ title: store.name, url: window.location.href }) : alert("Sharing not supported")}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
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

        {/* Products Grid using CategoryProduct style */}
       {/* Products Grid using CategoryProduct style */}
{filteredProducts.length === 0 ? (
  <p className="text-center text-gray-500">No products to display.</p>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {filteredProducts.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
      >
        {/* New Badge */}
        <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow z-10">
          New
        </span>

        {/* Product Image */}
        <div className="w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
  src={product.images && product.images.length > 0 ? product.images[0] : "fallback.jpg"}
  alt={product.name}
  className="max-w-full max-h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
/>

        </div>

        {/* Product Info */}
        <div className="flex flex-col p-5 h-[220px]">
          <h3 className="text-lg font-semibold text-gray-900 truncate product-title">
            {product.name}
          </h3>
          <p className="text-indigo-600 font-extrabold text-xl mt-1">
            ₹{product.price}
          </p>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          {store.phoneNumber && (
            <a
              href={`https://wa.me/91${store.phoneNumber}?text=Hi, I’m interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium"
            >
              WhatsApp to Buy
            </a>
          )}

          {/* Example Rating Stars */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, idx) => (
              <svg
                key={idx}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.145c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.947c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.947a1 1 0 00-.364-1.118l-3.36-2.44c-.784-.57-.38-1.81.588-1.81h4.145a1 1 0 00.95-.69l1.286-3.947z"/>
              </svg>
            ))}
          </div>
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
