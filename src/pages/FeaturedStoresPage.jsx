import React from "react";
import FeaturedStores from "../components/FeaturedStores";

const FeaturedStoresPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <FeaturedStores limit={1000} /> {/* show all */}
    </div>
  );
};

export default FeaturedStoresPage;
