import AddProduct from "./AddProduct";
import VendorProducts from "./VendorProduct";
import VendorHero from "./VendorHero";
import { Link } from "react-router-dom";

export default function VendorDashboard() {
  return (
    <div className="w-full bg-[#FFF3DD]">
      {/* Hero section */}
      <VendorHero />

      {/*  Triple Row Stripe */}
      <div className="w-full bg-[#fff3dd] flex justify-between px-6 py-10 mt-12 mb-10">
        {/* Left Strip */}
        <div className="flex flex-col gap-[2px]">
          {/* Row 1 */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`left-row1-${i}`}
                className={`w-[10px] h-[10px] ${
                  i % 2 === 0 ? "bg-yellow-500" : "bg-[#fff6e3]"
                }`}
              ></div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`left-row2-${i}`}
                className={`w-[10px] h-[10px] ${
                  i % 2 !== 0 ? "bg-yellow-500" : "bg-[#fff6e3]"
                }`}
              ></div>
            ))}
          </div>
          {/* Row 3 */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`left-row3-${i}`}
                className={`w-[10px] h-[10px] ${
                  i % 2 === 0 ? "bg-yellow-500" : "bg-[#fff6e3]"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Strip */}
        <div className="flex flex-col gap-[2px]">
          {/* Row 1 */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`right-row1-${i}`}
                className={`w-[10px] h-[10px] ${
                  i % 2 === 0 ? "bg-yellow-500" : "bg-[#fff6e3]"
                }`}
              ></div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`right-row2-${i}`}
                className={`w-[10px] h-[10px] ${
                  i % 2 !== 0 ? "bg-yellow-500" : "bg-[#fff6e3]"
                }`}
              ></div>
            ))}
          </div>
          {/* Row 3 */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`right-row3-${i}`}
                className={`w-[10px] h-[10px] ${
                  i % 2 === 0 ? "bg-yellow-500" : "bg-[#fff6e3]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[#B19258] mb-4 mt-8">
          Vendor Dashboard
        </h1>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          <Link
            to="/add-product"
            className="bg-[#B19258] text-white px-4 py-2 rounded hover:bg-[#9c7e41] transition"
          >
            Go to Add Product
          </Link>
          <Link
            to="/vendor-products"
            className="bg-[#B19258] text-white px-4 py-2 rounded hover:bg-[#9c7e41] transition"
          >
            Go to Vendor Products
          </Link>
        </div>
      </div>
    </div>
  );
}
