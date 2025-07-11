import React from "react";

export default function VendorHero() {
  return (
    <div className="w-full h-[80vh] bg-[#FFF3DD] mt-16 mx-2 flex items-center justify-between px-12 py-10 rounded overflow-hidden">
      {/* Left Content */}
      <div className="max-w-[50%]">
        <h1 className="text-5xl md:text-6xl font-bold text-[#664D36] leading-tight">
          Start Selling to Thousands of Customers Online
        </h1>
        <p className="mt-4 text-lg text-[#664D36]">
          Join InventoryApp as a vendor and grow your business across India with
          ease.
        </p>
        <button className="mt-6 bg-[#B19258] text-white font-semibold px-6 py-3 rounded hover:bg-[#a18349] transition">
          Add Products Now
        </button>
      </div>

      {/* Right Image */}
      <div className="w-[45%] hidden md:block">
        <img
          src="https://i.pinimg.com/736x/27/14/c3/2714c35852082a0f8d31fdc755c88d80.jpg"
          alt="Vendor"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
}
