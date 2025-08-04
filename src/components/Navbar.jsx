import React, { useState } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const suggestions = ["Laptop", "Shirts", "Books", "Smartphones"];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold text-orange-500">
            Customer's Delight
          </div>
        </Link>

        {/* Mobile Search */}
        <div className="flex items-center gap-3 md:hidden flex-1">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full flex-1">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(true)} className="md:hidden ml-2">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between flex-1 ml-10">
          <ul className="flex space-x-8 font-medium text-gray-700 relative">
            <li className="hover:text-orange-500 transition">
              <Link to="/">Home</Link>
            </li>

            {/* Categories dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition font-medium">
                Categories <ChevronDown className="w-4 h-4" />
              </button>

              <div
                className={`absolute top-full left-0 bg-white shadow-lg rounded-md py-3 px-2 w-60 z-50 transition-all duration-200 origin-top transform ${
                  showCategories
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/category/mens-wear"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
                    >
                      Men's Wear
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/womens-wear"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
                    >
                      Women's Wear
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/kids"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
                    >
                      Kids
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/Electronics"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
                    >
                      Electronics
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/shoes"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
                    >
                      Shoes
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="hover:text-orange-500 transition">
              <Link to="/offers">Offers</Link>
            </li>
            <li className="hover:text-orange-500 transition">
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>

          {/* Search Bar (Desktop) */}
          <div className="relative w-full max-w-md ml-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, or categories..."
              className="w-full py-2 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm transition duration-200"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition duration-200">
              <Search className="w-5 h-5" />
            </button>

            {searchQuery.length > 0 && (
              <ul className="absolute top-full mt-2 left-0 w-full bg-white shadow-lg rounded-md z-10">
                {suggestions
                  .filter((s) =>
                    s.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchQuery(item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="w-72 bg-white h-full shadow-lg p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-orange-500">Menu</span>
              <X
                className="w-6 h-6 text-gray-700 cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            </div>

            {/* Mobile Search */}
            <div className="mb-5">
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent focus:outline-none w-full text-sm text-gray-800"
                />
              </div>
              {searchQuery.length > 0 && (
                <ul className="mt-2 bg-white shadow-md rounded-md w-full z-10">
                  {suggestions
                    .filter((s) =>
                      s.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSearchQuery(item);
                          setMobileOpen(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Mobile Links */}
            <ul className="space-y-4 text-gray-700 font-medium">
              <li>
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <div
                  className="flex items-center justify-between cursor-pointer hover:text-orange-500"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showCategories ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {showCategories && (
                  <ul className="mt-2 ml-2 pl-2 border-l border-gray-200 space-y-2 text-sm text-gray-600">
                    <li>
                      <Link to="/category/mens-wear" onClick={() => setMobileOpen(false)}>
                        Men's Wear
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/womens-wear" onClick={() => setMobileOpen(false)}>
                        Women's Wear
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/kids" onClick={() => setMobileOpen(false)}>
                        Kids
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/Electronics" onClick={() => setMobileOpen(false)}>
                        Electronics
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/shoes" onClick={() => setMobileOpen(false)}>
                        Shoes
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link to="/offers" onClick={() => setMobileOpen(false)}>
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/about-us" onClick={() => setMobileOpen(false)}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
