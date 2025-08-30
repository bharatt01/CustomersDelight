import React from 'react'
import { auth } from "../../firebase";
import AddStore from './AddStore'
import ManageStores from './ManageStores'

function SuperAdminDashboard() {
const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.href = "/superadmin-login";
    });
  };

  return (
    <>
   
    {/* <Navbar></Navbar> */}
    <AddStore></AddStore>
    <button
  onClick={handleLogout}
  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
>
  Logout
</button>

    <ManageStores></ManageStores>
    </>
  )
}

export default SuperAdminDashboard