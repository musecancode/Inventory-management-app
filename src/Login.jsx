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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF3DD] px-4">
      {/* Quote Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#664D36]">
          “Login to unlock your style journey.”
        </h1>
        <p className="mt-2 text-[#664D36] text-sm">
          Let’s get you back to shopping.
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-xl bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#B19258]">
          Login to Your Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 mb-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 mb-6 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-[#B19258] hover:bg-[#B19258]/80 text-white w-full py-3 rounded-md text-lg font-semibold transition duration-200"
        >
          Log In
        </button>

        <p className="text-center text-sm mt-6 text-[#664D36]">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#664D36] hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
