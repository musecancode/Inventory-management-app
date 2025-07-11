import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const cartRef = collection(db, "users", user.uid, "cart");
        const snapshot = await getDocs(cartRef);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [user]);

  const handleRemoveItem = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "cart", id));
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleCheckout = async () => {
    if (!user) return;
    try {
      const cartRef = collection(db, "users", user.uid, "cart");
      const snapshot = await getDocs(cartRef);
      const cartData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (cartData.length === 0) return alert("Cart is empty.");

      await addDoc(collection(db, "users", user.uid, "orders"), {
        items: cartData,
        placedAt: new Date(),
        status: "Processing",
        arrivalDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      });

      for (const item of cartData) {
        await deleteDoc(doc(db, "users", user.uid, "cart", item.id));
      }

      setCartItems([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Try again.");
    }
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-5xl font-semibold text-center text-[#664D36] mt-6 mb-10">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Your Cart is Empty</h2>
          <div
            className="w-full max-w-md h-72 mx-auto bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/premium-vector/modern-design-concept-empty-cart_637684-304.jpg')",
            }}
          ></div>
          <button
            onClick={() => navigate("/consumer")}
            className="bg-[#B19258] text-black mt-6 font-semibold px-6 py-3 rounded hover:bg-[#b19258]/80 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8">
          {/* LEFT - Beige Products Section */}
          <div className="bg-[#fff8ef] p-6 rounded-xl shadow-sm">
            <h2 className="text-3xl font-semibold text-[#664D36] mb-6">
              Products
            </h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="relative flex w-full bg-white rounded-lg shadow-md overflow-hidden p-4"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-2 left-2 text-[#B19258] hover:text-red-600 font-bold text-xl"
                  >
                    ×
                  </button>

                  {/* Image */}
                  <div className="w-32 h-32 object-cover p-2">
                    <img
                      src={
                        item.imageUrl ||
                        "https://via.placeholder.com/100x100.png?text=Product"
                      }
                      alt={item.title}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-3">
                    <h3 className="text-lg font-semibold text-[#664D36]">
                      {item.title}
                    </h3>
                    <p className="text-green-700 text-sm font-medium">
                      In stock
                    </p>
                    <p className="text-[#664D36] text-md mt-1">
                      Price: ₹{item.price}
                    </p>
                    <div className="mt-1 text-sm text-[#333]">
                      Quantity: {item.quantity}
                    </div>
                    <div className="text-sm text-[#333] mt-1">
                      Total: ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Order Summary  */}
          <div className="p-6 rounded-xl shadow-md h-fit bg-[#fdf4e3]">
            <h2 className="text-3xl font-semibold text-[#664D36] mb-4">
              Order Summary
            </h2>
            <p className="text-md text-[#333] mb-2">
              Subtotal: ₹{getTotalPrice().toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Shipping and discounts will be calculated at checkout.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleCheckout}
                className="bg-[#664D36] text-white py-3 rounded hover:bg-[#523a2b]"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/cosumer")}
                className="bg-[#B19258] text-white py-3 rounded hover:bg-[#a98c4c]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
