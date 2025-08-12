import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Share2, Phone } from "lucide-react";

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
        <img
          src={store.imageUrl}
          alt={store.name}
          className="w-full h-full object-cover"
        />
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
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-green-600 font-bold text-lg mt-1 mb-2">₹{product.price}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <a
                    href={`https://wa.me/91${store.phoneNumber}?text=Hi, I’m interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition font-medium"
                  >
                    Click To Know More
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
