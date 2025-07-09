// src/Marketplace.jsx
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuthContext } from "./AuthContext";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const { user, role } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const fetchAllVendorProducts = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const allProducts = [];

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const userData = userDoc.data();

        if (userData.role === "vendor") {
          const productSnapshot = await getDocs(
            collection(db, "users", userId, "products")
          );

          productSnapshot.forEach((doc) => {
            allProducts.push({
              ...doc.data(),
              id: doc.id,
              vendorId: userId,
            });
          });
        }
      }

      setProducts(allProducts);
    };

    fetchAllVendorProducts();
  }, [user]);

  const handleAddToCart = async (product) => {
    if (!user || role !== "consumer") {
      alert("Only consumers can add to cart.");
      return;
    }

    try {
      const cartRef = doc(db, "users", user.uid, "cart", product.id);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const existingQty = cartSnap.data().quantity;
        await updateDoc(cartRef, {
          quantity: existingQty + 1,
        });
        console.log("Cart item updated");
      } else {
        await setDoc(cartRef, {
          title: product.title,
          price: product.price,
          vendorId: product.vendorId,
          stock: product.stock,
          image: product.image || "",
          quantity: 1,
        });
        console.log("Cart item created");
      }

      alert("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={`${product.vendorId}-${product.id}`}
            className="border p-4 rounded shadow"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-cover w-full rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">Price: ₹{product.price}</p>
            <p className="text-gray-500">Stock: {product.stock}</p>

            {/* Removed Buy Now button */}

            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
