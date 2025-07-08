// src/SignUp.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      // adding to firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
        name,
        phone,
        age,
        gender,
      });

      alert("Signed up successfully!");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-10 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 mb-3 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="w-full border p-2 mb-3 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        className="w-full border p-2 mb-3 rounded"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select
        className="w-full border p-2 mb-3 rounded"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
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
        className="w-full border p-2 mb-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="w-full border p-2 mb-4 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="consumer">Consumer</option>
        <option value="vendor">Vendor</option>
      </select>
      <button
        onClick={handleSignup}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-purple-700"
      >
        Sign Up
      </button>

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
