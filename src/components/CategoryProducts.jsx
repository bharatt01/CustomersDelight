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
        // Get products by category
        const q = query(
          collectionGroup(db, "products"),
          where("category", "==", categoryName)
        );
        const snapshot = await getDocs(q);

        // Attach store data to each product (for phone number)
        const productsData = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const productData = docSnap.data();

            // The storeId is in the path: stores/{storeId}/products/{productId}
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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
    <Navbar></Navbar>
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 capitalize">{categoryName}</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products to display.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-green-600 font-bold text-lg mt-1 mb-2">
                  ₹{product.price}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  {product.description}
                </p>
                {product.storePhone && (
                  <a
                    href={`https://wa.me/91${product.storePhone}?text=Hi, I’m interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition font-medium"
                  >
                    WhatsApp to Buy
                  </a>
                )}
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
