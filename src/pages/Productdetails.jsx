import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import LazyImage from "../components/LazyImage";
import './productdetail.css';
import Navbar from '../components/Navbar'
const ProductDetails = () => {
  const { state: product } = useLocation();
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return <p>Product not found.</p>;
 const handleBuyNow = (product) => {
    // const phoneNumber = "9717024896"; 
    const message = `Hello, I am interested in buying "${product.name}" from "${product.storeName}". Could you please provide more details?\nHere is the product image: ${window.location.origin}${product.image}`;
    const url = `https://wa.me/${product.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return (
    <>
    <Navbar/>
     <Container className="py-5">
        <h1 className="text-center mb-4">{product.storeName}</h1> 
    <div className="product-details container">
      <div className="product-grid">
        <div className="product-images">
          <LazyImage src={product.image} alt={product.name} className="main-image" />
        
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
         
          <p className="desc">{product.description}</p>

          <div className="options">
          
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button className="btn-buy"   onClick={() => handleBuyNow(product)}>Click to connect</button>
          </div>
        </div>
      </div>
    </div>
    </Container>
    </>
  );
};

export default ProductDetails;
