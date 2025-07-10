import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full p-2 mt-14 bg-[#FFF3DD]">
      {/* Hero Section */}
      <div className="w-full h-[90vh] bg-[#B19258] rounded-xl shadow-lg flex items-start justify-between overflow-hidden">
        {/* Left Text Content */}
        <div className="w-[55%] flex flex-col justify-center pl-12 h-full">
          <h1 className="text-[100px] leading-[90px] font-extrabold text-white uppercase tracking-tight">
            Smartly
            <br />
            Track &
            <br />
            Manage
            <br />
            Inventory
          </h1>
          <p className="mt-6 text-xl text-white tracking-wide max-w-md">
            Keep your stock organized and up to date effortlessly.
          </p>
          <button className="mt-10 bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded shadow-md rotate-[-6deg] hover:scale-105 transition-all w-fit">
            Get Started
          </button>
        </div>

        {/* Right Image Content */}
        <div className="w-[45%] h-full flex justify-end items-start p-4">
          <img
            src="https://rankoone.com/wp-content/uploads/2024/02/eCommerce-Website-Components-photo.jpg"
            alt="Hero"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Category Section */}
      <div className="w-full bg-[#FFF3DD] mt-20">
        <h2 className="text-6xl font-semibold text-[#664D36] mb-20 pl-8">
          Get Started
        </h2>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-9 relative px-4">
          {/* Consumer Card - Positioned Higher */}
          <div
            className="relative h-[550px] mt-[-30px] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => navigate("/consumer-dashboard")}
          >
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
              alt="Consumer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
                Start as Consumer
              </h3>
            </div>
          </div>

          {/* Vendor Card - Positioned Lower */}
          <div
            className="relative h-[550px] mt-[30px] mb-[64px] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => navigate("/vendor-dashboard")}
          >
            <img
              src="https://cdn.prod.website-files.com/61017e6b22c7fa6cb9edc36a/6111cb1c36c6b55143788333_60d8c69bc2f1e4bd1b1739a7_ecommerce_seller_1300x867.jpeg"
              alt="Vendor"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white text-center">
                Start as Vendor
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
