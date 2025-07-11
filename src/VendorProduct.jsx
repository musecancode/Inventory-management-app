import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthContext } from "./AuthContext";

export default function VendorProducts() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, "users", user.uid, "products");
      const snapshot = await getDocs(productsRef);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchProducts();
    }
  }, [user]);

  if (!user?.uid) {
    return (
      <div className="p-6 min-h-screen bg-[#fff3dd]">
        <p className="text-red-600">You must be logged in as a vendor.</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#fff3dd]">
      <h2 className="text-4xl font-bold text-[#B19258] mt-16 mb-8 text-center">
        Your Products
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center bg-white p-4 rounded shadow"
            >
              {/* Image */}
              <div className="w-20 h-20 flex items-center justify-center rounded-2xl overflow-hidden border bg-[#f8f0e5] mr-6">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xl font-bold text-[#B19258]">
                    {p.title?.charAt(0).toUpperCase() || "P"}
                  </span>
                )}
              </div>

              {/* Text Content */}
              <div>
                <div className="text-xl font-semibold text-[#664D36] mb-1">
                  {p.title}
                </div>
                <div className="text-sm text-[#664D36]mt-1">
                  Price: ₹{p.price}
                </div>
                <div className="text-sm text-[#664D36]">Stock: {p.stock}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
