import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthContext } from "./AuthContext";
import AddProduct from "./AddProduct";
import VendorProducts from "./VendorProduct";

export default function VendorDashboard() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  const fetchProducts = async (id) => {
    try {
      const productsRef = collection(db, "users", id, "products");
      const snapshot = await getDocs(productsRef);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchProducts(user.uid);
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-purple-700 mb-6">
        Vendor Dashboard
      </h1>
      <AddProduct
        vendorId={user.uid}
        refreshProducts={() => fetchProducts(user.uid)}
      />
      <VendorProducts products={products} />
    </div>
  );
}
