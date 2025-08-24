import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const FeaturedProductsPage = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen">
      <FeaturedProducts limit={1000} /> {/* show more than 4 */}
    </div>
    <Footer />
    </>
  );
};

export default FeaturedProductsPage;
