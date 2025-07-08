// src/Marketplace.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useAuthContext } from "./AuthContext";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
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
  }, []);

  const handleBuy = async (product) => {
    const quantity = parseInt(prompt("Enter quantity: "), 10);

    if (!quantity || quantity <= 0) return alert("Invalid quantity");

    const orderData = {
      productId: product.id,
      vendorId: product.vendorId,
      title: product.title,
      price: product.price,
      quantity,
      status: "Pending",
      orderDate: new Date().toISOString(),
    };

    try {
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .add(orderData);

      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <button
              className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
              onClick={() => handleBuy(product)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
