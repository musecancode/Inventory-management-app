// src/VendorProducts.jsx
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function VendorProducts() {
  const [products, setProducts] = useState([]);

  // Function to fetch products from subcollection
  const fetchVendorProducts = async (vendorId) => {
    try {
      const productsRef = collection(db, "users", vendorId, "products");
      const snapshot = await getDocs(productsRef);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    } catch (err) {
      console.error("Error fetching vendor products:", err);
    }
  };

  // Wait for auth to be ready before calling fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchVendorProducts(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        products.map((p) => (
          <div key={p.id} className="border-b py-2">
            <div>
              <strong>{p.title}</strong>
            </div>
            <div>
              ₹{p.price} — Stock: {p.stock}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
