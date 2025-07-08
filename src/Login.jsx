// src/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        if (role === "vendor") {
          navigate("/vendor");
        } else if (role === "consumer") {
          navigate("/consumer");
        } else {
          alert("Invalid role!");
        }
      } else {
        alert("No user data found!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-10 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-4 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-purple-700 text-white w-full py-2 rounded hover:bg-purple-400"
      >
        Log In
      </button>

      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-purple-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
