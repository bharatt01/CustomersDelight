import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [editingStore, setEditingStore] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", email: "", phone: "" });

  // Fetch stores from Firestore
  const fetchStores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "stores"));
      const storeData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStores(storeData);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleDelete = async (storeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this store?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "stores", storeId));
      alert("Store deleted successfully.");
      setStores((prevStores) => prevStores.filter((store) => store.id !== storeId));
    } catch (error) {
      console.error("Error deleting store:", error);
      alert("Failed to delete store. Try again.");
    }
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setUpdatedData({
      name: store.name,
      email: store.email,
      phone: store.phone,
    });
  };

  const toggleFeatured = async (store) => {
    try {
      const storeRef = doc(db, "stores", store.id);
      await updateDoc(storeRef, { featured: !store.featured });

      alert(`Store ${store.featured ? "removed from" : "marked as"} featured`);

      // Update locally without refetch
      setStores((prev) =>
        prev.map((s) =>
          s.id === store.id ? { ...s, featured: !store.featured } : s
        )
      );
    } catch (error) {
      console.error("Error updating featured status:", error);
      alert("Failed to update featured status.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Stores</h2>

      {stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Store Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Featured</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{store.name}</td>
                  <td className="py-2 px-4 border">{store.email}</td>
                  <td className="py-2 px-4 border">{store.phone}</td>
                  <td className="py-2 px-4 border text-center">
                    {store.featured ? (
                      <span className="text-yellow-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border flex gap-3">
                    <Link
                      to={`/${store.slug}`}
                      className="text-blue-600 underline"
                      target="_blank"
                    >
                      View
                    </Link>
                    <button
                      className="text-green-600 hover:underline"
                      onClick={() => handleEdit(store)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(store.id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`${
                        store.featured ? "text-yellow-600" : "text-gray-600"
                      } hover:underline`}
                      onClick={() => toggleFeatured(store)}
                    >
                      {store.featured ? "Unfeature" : "Feature"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Edit Store Modal */}
      {editingStore && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Store</h2>
            <input
              type="text"
              placeholder="Store Name"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={updatedData.email}
              onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              value={updatedData.phone}
              onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingStore(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const storeRef = doc(db, "stores", editingStore.id);
                    await updateDoc(storeRef, updatedData);
                    alert("Store updated successfully!");
                    setEditingStore(null);

                    // Refresh locally
                    setStores((prev) =>
                      prev.map((s) =>
                        s.id === editingStore.id ? { ...s, ...updatedData } : s
                      )
                    );
                  } catch (error) {
                    console.error("Update error:", error);
                    alert("Failed to update store.");
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStores;
