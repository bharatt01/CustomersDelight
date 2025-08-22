import React, { useState } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
     {/* Logo */}
{/* Logo */}
<Link to="/" className="md:ml-0 -ml-3 mr-3">
  <div className="text-xl font-bold text-orange-500 whitespace-nowrap">
    Customer's Delight
  </div>
</Link>


        {/* Mobile Search */}
   <form
  onSubmit={handleSearch}
  className="flex items-center gap-3 md:hidden flex-1"
>
  <div
    className="flex items-center bg-gray-100 px-3 py-1 rounded-full flex-1 
               border border-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
  >
    <Search className="w-4 h-4 text-gray-500 mr-2" />
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search..."
      className="bg-transparent focus:outline-none w-full text-sm text-gray-800"
    />
  </div>
</form>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(true)} className="md:hidden ml-2">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between flex-1 ml-6 gap-6">
          <ul className="flex items-center gap-6 font-medium text-gray-700 whitespace-nowrap">
            <li className="hover:text-orange-500 transition">
              <Link to="/">Home</Link>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className="flex items-center gap-1 hover:text-orange-500 transition">
                Categories <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown */}
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
                      to="/category/men"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
                    >
                      Men
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/women"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
                    >
                      Women
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
    to="/category/Home-Appliances"
    onClick={() => setMobileOpen(false)}
    className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
  >
    Home Appliances
  </Link>
</li>
<li>
  <Link
    to="/category/Furniture"
    onClick={() => setMobileOpen(false)}
    className="flex items-center gap-2 px-3 py-2 hover:bg-orange-100 rounded transition"
  >
    Furniture
  </Link>
</li>
</ul>
              </div>
            </li>
            <li className="hover:text-orange-500 transition">
              <Link to="/prime-member">Prime Membership</Link>
            </li>
            <li className="hover:text-orange-500 transition">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="hover:text-orange-500 transition">
              <Link to="/blogs">Blogs</Link>
            </li>
          </ul>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="relative flex-shrink-0 w-full max-w-sm"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, or categories..."
               className="w-full py-2 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none"
    style={{
      boxShadow: "0 0 2px orange", // ✅ orange box shadow
    }}
    onFocus={(e) => (e.target.style.boxShadow = "0 0 8px orange")}
    onBlur={(e) => (e.target.style.boxShadow = "0 0 6px orange")}
  
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-orange-500 hover:bg-orange-600 p-2 rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
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
            <form onSubmit={handleSearch} className="mb-5">
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
            </form>

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
                      <Link
                        to="/category/men"
                        onClick={() => setMobileOpen(false)}
                      >
                        Men
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/category/womens"
                        onClick={() => setMobileOpen(false)}
                      >
                        Women
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/category/kids"
                        onClick={() => setMobileOpen(false)}
                      >
                        Kids
                      </Link>
                    </li>
                      <li>
                      <Link
                        to="/category/Home-appliances"
                        onClick={() => setMobileOpen(false)}
                      >
                        Home Appliances
                      </Link>
                    </li>
                      <li>
                      <Link
                        to="/category/Furniture"
                        onClick={() => setMobileOpen(false)}
                      >
                        Furniture
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/Prime-member"
                  onClick={() => setMobileOpen(false)}
                >
                  Prime Membership
                </Link>
              </li>
              <li>
                <Link to="/about-us" onClick={() => setMobileOpen(false)}>
                  About Us
                </Link>
              </li>
              <li className="hover:text-orange-500 transition">
                <Link to="/blogs" onClick={() => setMobileOpen(false)}>
                  Blogs
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
