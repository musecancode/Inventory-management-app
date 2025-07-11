import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthContext } from "./AuthContext";

export default function AddProduct() {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState([]);

  const [errors, setErrors] = useState({});

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
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchProducts();
    }
  }, [user]);

  const handleAddProduct = async () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!stock) newErrors.stock = "Stock is required.";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      const productsSubColRef = collection(userDocRef, "products");

      await addDoc(productsSubColRef, {
        title,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
        createdAt: serverTimestamp(),
      });

      // Reset
      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
      setErrors({});
      fetchProducts();
    } catch (error) {
      console.error("Add product error:", error);
    }
  };

  return (
    <div className="bg-[#fff3dd] min-h-screen py-10 px-4 flex flex-col items-center">
      {/* Form Container */}
      <div className="w-full max-w-3xl bg-[#B19258] p-8 rounded shadow-md mt-12">
        <h2 className="text-3xl font-bold text-[#fff3dd] mb-6 text-center">
          Add New Product
        </h2>

        {/* Title */}
        <div className="mb-2">
          <label className="block mb-1 font-medium">Product Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            className="w-full border p-2 bg-[#fff3dd] rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            placeholder="Write a short description"
            className="w-full border p-2 bg-[#fff3dd] rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-2">
          <label className="block mb-1 font-medium">Price (₹)</label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full border p-2 bg-[#fff3dd] rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Stock */}
        <div className="mb-2">
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            className="w-full border p-2 bg-[#fff3dd] rounded"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          {errors.stock && (
            <p className="text-red-600 text-sm mt-1">{errors.stock}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            placeholder="Paste image URL"
            className="w-full border p-2 bg-[#fff3dd] rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {errors.imageUrl && (
            <p className="text-red-600 text-sm mt-1">{errors.imageUrl}</p>
          )}
        </div>

        <button
          onClick={handleAddProduct}
          className="bg-[#664D36]/80 text-white w-full py-2 rounded hover:bg-[#664D36]"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
