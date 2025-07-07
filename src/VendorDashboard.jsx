// src/VendorDashboard.jsx
import AddProduct from "./AddProduct";
import VendorProducts from "./VendorProduct";

export default function VendorDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-purple-700 mb-6">
        Vendor Dashboard
      </h1>
      <AddProduct />
      <VendorProducts />
    </div>
  );
}
