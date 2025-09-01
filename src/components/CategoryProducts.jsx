import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collectionGroup, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import LazyImage from "./LazyImage";
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
  <LazyImage
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
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {products.map((product) => (
    <div
      key={product.id}
      className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative w-full h-72 overflow-hidden">
        <LazyImage
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/600"
          }
          alt={product.name}
          className="w-full h-full object-contain bg-white"
          onError={(e) => (e.target.src = "https://via.placeholder.com/600")}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
              Special Offer
            </span>
          )}
          {product.deal && (
            <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
              DEAL
            </span>
          )}
          {product.offer && (
            <span className="bg-cyan-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
              {product.offer}
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-800 font-semibold mb-2">₹{product.price}</p>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {product.description || "No description available."}
        </p>

        {/* WhatsApp Buy Button */}
        {product.storePhone && (
          <a
            href={`https://wa.me/91${product.storePhone}?text=Hi, I’m interested in ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-bold shadow-md hover:shadow-lg transition duration-300 text-center"
          >
            Buy Now
          </a>
        )}
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
