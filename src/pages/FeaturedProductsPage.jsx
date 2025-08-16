import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";

const FeaturedProductsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <FeaturedProducts limit={1000} /> {/* show more than 4 */}
    </div>
  );
};

export default FeaturedProductsPage;
