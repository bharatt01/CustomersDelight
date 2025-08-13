import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collectionGroup, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

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

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-6 capitalize text-gray-900">
          {categoryName}
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products to display.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
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
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col p-5 h-[220px]">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-indigo-600 font-extrabold text-xl mt-1">
                    ₹{product.price}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    {product.storePhone && (
                      <a
                        href={`https://wa.me/91${product.storePhone}?text=Hi, I’m interested in ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition font-medium"
                      >
                        WhatsApp to Buy
                      </a>
                    )}
                  </div>

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
    </>
  );
};

export default CategoryProducts;
