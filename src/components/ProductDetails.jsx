import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useSearchParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("store");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!storeId || !id) return;
      const productRef = doc(db, "stores", storeId, "products", id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const data = productSnap.data();
        setProduct(data);
        setSelectedImage(data.images?.[0]);
      }
    };
    fetchProduct();
  }, [storeId, id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Image */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumbnail-${idx}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-2">₹{product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
