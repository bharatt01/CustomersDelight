import React from "react";
import AddProduct from "./AddProduct";
import StoreProductList from "./StoreProductList";
import { auth } from "../../firebase";

const AdminDashboard = () => {
  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.href = "/admin-login";
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Store Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <AddProduct />
      <StoreProductList />
    </div>
  );
};

export default AdminDashboard;
