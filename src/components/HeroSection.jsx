import React from 'react';
import { useNavigate } from 'react-router-dom';

const Heros = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-start px-6 md:px-16 bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/Images/hero.jpg'})`,
        }}
      ></div>

      {/* Solid overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-left text-white space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Explore <span className="text-orange-400">Top Fashion Stores</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 font-normal max-w-xl">
          Shop directly from local fashion entrepreneurs. Skip the middlemen. Support bold, original style.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => navigate("/men'swear")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md"
          >
            Men's Wear
          </button>
          <button
            onClick={() => navigate("/women'swear")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md"
          >
            Women's Wear
          </button>
          <button
            onClick={() => navigate("/stores")}
            className="border border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-md"
          >
            Browse Stores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Heros;
