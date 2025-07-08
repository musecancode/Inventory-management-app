import { useState } from "react";
import { db } from "./firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddProduct({ vendorId, refreshProducts }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleAddProduct = async () => {
    try {
      if (!vendorId) throw new Error("User not logged in");

      const userDocRef = doc(db, "users", vendorId);
      const productsSubColRef = collection(userDocRef, "products");

      await addDoc(productsSubColRef, {
        title,
        price: parseFloat(price),
        stock: parseInt(stock),
        createdAt: serverTimestamp(),
      });

      alert("Product added!");
      setTitle("");
      setPrice("");
      setStock("");

      refreshProducts(); // Trigger re-fetch
    } catch (error) {
      console.error("Add product error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-8 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <input
        type="text"
        placeholder="Product Title"
        className="w-full border p-2 mb-3 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2 mb-3 rounded"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        className="w-full border p-2 mb-4 rounded"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button
        onClick={handleAddProduct}
        className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700"
      >
        Add Product
      </button>
    </div>
  );
}
