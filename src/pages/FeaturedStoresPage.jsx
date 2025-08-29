import React from "react";
import FeaturedStores from "../components/FeaturedStores";
import LazyImage from "../components/LazyImage";
const FeaturedStoresPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <FeaturedStores limit={1000} /> {/* show all */}
    </div>
  );
};

export default FeaturedStoresPage;
