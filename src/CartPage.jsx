import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  increment,
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

  const handleCheckout = async () => {
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");
    const orderRef = collection(db, "users", user.uid, "orders");

    try {
      const snapshot = await getDocs(cartRef);
      const cartData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (cartData.length === 0) {
        alert("Cart is empty.");
        return;
      }

      await addDoc(orderRef, {
        items: cartData,
        placedAt: new Date(),
        status: "Processing",
        arrivalDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      });

      for (const item of cartData) {
        const productRef = doc(
          db,
          "users",
          item.vendorId,
          "products",
          item.productId
        );

        try {
          await updateDoc(productRef, {
            stock: increment(-item.quantity),
          });
        } catch (err) {
          console.error(
            `Failed to update stock for product ${item.productId}:`,
            err
          );
          alert(`Could not update stock for ${item.title}. Try again later.`);
        }

        try {
          await deleteDoc(doc(db, "users", user.uid, "cart", item.id));
        } catch (err) {
          console.error(`Failed to delete cart item ${item.id}:`, err);
        }
      }

      alert("Order placed successfully!");
      setCartItems([]);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Try again.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl text-[#664D36] font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="w-full">
          {/* Heading */}
          <h2 className="text-5xl font-semibold text-center mb-8 text-[#664D36]">
            Your Cart is Empty
          </h2>

          {/* Background Image Section */}
          <div
            className="w-full h-[450px]  bg-no-repeat bg-center bg-contain rounded-xl shadow-md mb-8"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/premium-vector/modern-design-concept-empty-cart_637684-304.jpg')",
            }}
          ></div>

          <div className="text-center">
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-[#B19258] text-black font-semibold px-6 py-3 rounded hover:bg-[#B19258]/80 transition"
            >
              Browse Products
            </button>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="p-4 border rounded-lg shadow">
                <h3 className="text-xl">{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/marketplace")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
