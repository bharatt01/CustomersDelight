import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [storeExists, setStoreExists] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  // Step 1: Check if store exists and determine login/register
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, "stores"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("No store found with this email.");
        return;
      }

      setStoreExists(true);

      const methods = await fetchSignInMethodsForEmail(auth, email);
      setIsRegisterMode(methods.length === 0); // register if no auth record
      setShowPasswordField(true);
    } catch (err) {
      console.error("Email check error:", err);
      alert("Error verifying email.");
    }
  };

  // Step 2: Handle Login or Register
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created! You can now add products.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful.");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Auth error:", err);
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in instead.");
        setIsRegisterMode(false);
      } else if (err.code === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Store Admin Login</h2>
      <form onSubmit={storeExists ? handleAuth : handleEmailSubmit}>
        <input
          type="email"
          placeholder="Enter your store email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />
        {showPasswordField && (
          <input
            type="password"
            placeholder={isRegisterMode ? "Create Password" : "Enter Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-4"
            required
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {showPasswordField
            ? isRegisterMode
              ? "Register"
              : "Login"
            : "Next"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
