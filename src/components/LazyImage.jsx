import React, { useState } from "react";

const LazyImage = ({ src, alt, className, placeholder }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      {/* Placeholder / Blur Loader */}
      {!loaded && (
        <img
          src={placeholder || "https://via.placeholder.com/300x200?text=Loading..."}
          alt="placeholder"
          className="absolute inset-0 w-full h-full object-cover blur-md"
        />
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-700 ease-in-out w-full h-full object-cover ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default LazyImage;
