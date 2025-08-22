import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collectionGroup, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import "./categoryproducts.css"; // optional if you want to add animation like featuredstores

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

  return (
    <>
      <Navbar />

      <div className="relative p-8 bg-gray-50 overflow-hidden">
        {/* Background gradient blobs like FeaturedStores */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-orange-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-yellow-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>

        {/* Section Heading */}
        <div className="flex items-center mb-12 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-red-600 relative capitalize">
            {categoryName}
            <span className="absolute -inset-1 bg-gradient-to-r from-orange-200 via-yellow-200 to-red-100 blur-xl opacity-25 rounded-lg animate-pulse-slow"></span>
          </h1>
          <div className="flex-1 h-1 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-600 rounded-full relative overflow-hidden ml-4">
            <span className="absolute left-0 top-0 h-full w-1/3 bg-white opacity-20 animate-pulse-slow"></span>
          </div>
        </div>

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
                className                ="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}{/* Product Image */}
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
