// import React, { useState } from "react";
// import { db } from "../../firebase"; // ✅ Your Firestore config
// import { collection, addDoc } from "firebase/firestore";
// import Navbar from "../../components/Navbar";
// import { auth } from "../../firebase";




// const CLOUDINARY_UPLOAD_PRESET = "CustomersDelight"; // replace with yours
// const CLOUD_NAME = "dc4hshi8o"; // replace with yours

// const AddStore = () => {
//   const [storeName, setStoreName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const uploadImageToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await res.json();
//     return data.secure_url; // ⬅️ Returns the uploaded image URL
//   };

//   const handleAddStore = async (e) => {
//      e.preventDefault();

//   const currentUser = auth.currentUser;

//   if (!currentUser || currentUser.email !== "bs@gmail.com") {
//     alert("You are not authorized to add a store.");
//     return;
//   }

//   if (!storeName || !description || !imageFile) {
//     alert("Please fill all fields");
//     return;
//   }

//   try {
//     setLoading(true);

//     const imageUrl = await uploadImageToCloudinary(imageFile);

//     await addDoc(collection(db, "stores"), {
//       name: storeName,
//       description,
//       imageUrl,
//       createdAt: new Date(),
//     });

//     alert("Store added successfully!");
//     setStoreName("");
//     setDescription("");
//     setImageFile(null);
//   } catch (error) {
//     console.error("Error adding store:", error);
//     alert("Failed to add store");
//   } finally {
//     setLoading(false);
//   }

//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//         <h2 className="text-2xl font-semibold mb-4">Add New Store</h2>
//         <form onSubmit={handleAddStore}>
//           <input
//             type="text"
//             placeholder="Store Name"
//             className="w-full p-2 mb-3 border rounded"
//             value={storeName}
//             onChange={(e) => setStoreName(e.target.value)}
//           />
//           <textarea
//             placeholder="Store Description"
//             className="w-full p-2 mb-3 border rounded"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//           <input
//             type="file"
//             accept="image/*"
//             className="mb-4"
//             onChange={(e) => setImageFile(e.target.files[0])}
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//             disabled={loading}
//           >
//             {loading ? "Adding..." : "Add Store"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddStore;










import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import { auth } from "../../firebase";
import React, { useState, useRef } from "react";

const CLOUDINARY_UPLOAD_PRESET = "CustomersDelight"; // replace with yours
const CLOUD_NAME = "dc4hshi8o"; // replace with yours

// ✅ Converts store name to slug format
const generateSlug = (name) => {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

const AddStore = () => {
  const [storeName, setStoreName] = useState("");
  const [storeMobileNumber, setStoreMobileNumber] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
const [storeEmail,setStoreEmail] = useState("");

const fileInputRef = useRef(null);
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleAddStore = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser || currentUser.email !== "bharatsharma@gmail.com") {
      alert("You are not authorized to add a store.");
      return;
    }

    if (!storeName || !description || !imageFile) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const slug = generateSlug(storeName);

      // ✅ Check if slug already exists
      const slugQuery = query(collection(db, "stores"), where("slug", "==", slug));
      const slugSnapshot = await getDocs(slugQuery);

      if (!slugSnapshot.empty) {
        alert("Store with this name already exists. Please use a different name.");
        setLoading(false);
        return;
      }

      const imageUrl = await uploadImageToCloudinary(imageFile);

    
 await addDoc(collection(db, "stores"), {
  name: storeName,
  slug,
  description,
  imageUrl,
  phoneNumber: storeMobileNumber, // ✅ Add this
  email:storeEmail,
  createdAt: new Date(),
});


      alert("Store added successfully!");
      setStoreName("");
      setDescription("");
      setImageFile(null);
      if (fileInputRef.current) {
  fileInputRef.current.value = null;
}

    } catch (error) {
      console.error("Error adding store:", error);
      alert("Failed to add store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add New Store</h2>
        <form onSubmit={handleAddStore}>
          <input
            type="text"
            placeholder="Store Name"
            className="w-full p-2 mb-3 border rounded"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <input type="text"
          placeholder="Phone Number"
          className="w-full p-2 mb-3 border rounded"
          value={storeMobileNumber}
          onChange={(e) => setStoreMobileNumber(e.target.value)} />
          <input type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={storeEmail}
          onChange={(e) => setStoreEmail(e.target.value)}></input>
          <textarea
            placeholder="Store Description"
            className="w-full p-2 mb-3 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="file"
            accept="image/*"
              ref={fileInputRef} 
            className="mb-4"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Store"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStore;
