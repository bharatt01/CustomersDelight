import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collectionGroup, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Example category images (you can replace with real ones)
const categoryBanners = {
  men: "/Images/menss.png",
  women: "/Images/womens.png",
  kids: "/Images/kidss.png",
  furniture: "/Images/furnituree.png",
  homeappliances: "/Images/homeappliances.png",
  // default: "/Images/default.png", // add fallback
};
// Add this above your component
// const categoryTexts = {
//   men: {
//     heading: "Men's Fashion",
//     subheading: "Sharp styles, rugged looks, and everything you need to own your day.",
//   },
//   women: {
//     heading: "For Women",
//     subheading: "Elegance, comfort, and fashion trends tailored just for you.",
//   },
//   kids: {
//     heading: "For Kids",
//     subheading: "Playful, comfy, and colorful picks for every little adventure.",
//   },
//   furniture: {
//     heading: "Furniture",
//     subheading: "Crafted with care to bring comfort and style into your home.",
//   },
//   homeappliances: {
//     heading: "Home Appliances",
//     subheading: "Smart solutions to make your everyday life easier and efficient.",
//   },
//   default: {
//     heading: "Our Collection",
//     subheading: "Explore our wide range of products for every lifestyle.",
//   },
// };
const categoryTexts = {
  men: {
    heading: "Men's Fashion",
    subheading: "Sharp styles, rugged looks, and everything you need to own your day.",
    sectionTitle: "Discover Men's Collection",
    sectionDesc: "Buy latest trendy, modern, ethnic, Indian, western, formal, party wear and more"
  },
  women: {
    heading: "For Women",
    subheading: "Elegance, comfort, and fashion trends tailored just for you.",
    sectionTitle: "Discover Women's Collection",
    sectionDesc: "Find chic dresses, casuals, and everything a modern woman needs."
  },
  kids: {
    heading: "For Kids",
    subheading: "Playful, comfy, and colorful picks for every little adventure.",
    sectionTitle: "Discover Kids' Collection",
    sectionDesc: "Fun, comfortable, and durable fashion for the little ones."
  },
  furniture: {
    heading: "Furniture",
    subheading: "Crafted with care to bring comfort and style into your home.",
    sectionTitle: "Discover Furniture",
    sectionDesc: "Modern and classic pieces to transform your living space."
  },
  homeappliances: {
    heading: "Home Appliances",
    subheading: "Smart solutions to make your everyday life easier and efficient.",
    sectionTitle: "Discover Home Appliances",
    sectionDesc: "Upgrade your lifestyle with the latest appliances."
  },
  // default: {
  //   heading: "Our Collection",
  //   subheading: "Explore our wide range of products for every lifestyle.",
  //   sectionTitle: "Our Collection",
  //   sectionDesc: "Browse from thousands of products across all categories."
  // },
};

// Skeleton loader for products
const ProductSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col animate-pulse border border-gray-200">
      <div className="w-full h-64 bg-gray-200"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 w-2/3 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-300 rounded mt-auto"></div>
      </div>
    </div>
  );
};

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const q = query(
          collectionGroup(db, "products"),
          where("category", "==", categoryName)
        );
        const snapshot = await getDocs(q);

        const productsData = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const productData = docSnap.data();
            const storeId = docSnap.ref.parent.parent.id;
            const storeSnap = await getDoc(doc(db, "stores", storeId));
            const storeData = storeSnap.exists() ? storeSnap.data() : {};

            return {
              id: docSnap.id,
              ...productData,
              storePhone: storeData.phoneNumber || "",
            };
          })
        );

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  // pick image for category
  const bannerImage =
    categoryBanners[categoryName?.toLowerCase()] || categoryBanners.default;

  return (
    <>
      <Navbar />

      {/* Category Banner Strip */}
     {/* Category Banner Strip */}
<div className="relative w-full h-60 md:h-72 lg:h-80 overflow-hidden">
  <img
    src={bannerImage}
    alt={`${categoryName} banner`}
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-3">
      {categoryTexts[categoryName]?.heading ||
        categoryTexts.default.heading}
    </h1>
    <p className="text-white text-lg md:text-xl max-w-2xl leading-snug">
      {categoryTexts[categoryName]?.subheading ||
        categoryTexts.default.subheading}
    </p>
  </div>
</div>

{/* Category Section Heading (below banner) */}
<div className="text-center py-16 bg-white">
  <h2 className="relative inline-block text-4xl md:text-5xl font-extrabold tracking-tight">
    <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-400 bg-clip-text text-transparent">
      {categoryTexts[categoryName]?.sectionTitle ||
        categoryTexts.default.sectionTitle}
    </span>
  </h2>
  
  {/* Thick underline accent */}
  <div className="mt-4 flex justify-center">
    <span className="h-1.5 w-32 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-400 shadow-md"></span>
  </div>

  <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
    {categoryTexts[categoryName]?.sectionDesc ||
      categoryTexts.default.sectionDesc}
  </p>
</div>

      {/* Category Products Section */}
      <div className="relative p-8 bg-gray-50 overflow-hidden">
        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 relative z-10">
            No products to display.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-64 object-contain p-4 bg-gray-50"
                  />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    New
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-orange-600 font-extrabold text-xl mb-2">
                    ₹{product.price}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* WhatsApp Buy Button */}
                  {product.storePhone && (
                    <a
                      href={`https://wa.me/91${product.storePhone}?text=Hi, I’m interested in ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-full 
                                 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold text-sm
                                 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      WhatsApp to Buy
                    </a>
                  )}

                  {/* Rating Stars */}
                  <div className="flex items-center mt-3">
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

export default CategoryProducts;
