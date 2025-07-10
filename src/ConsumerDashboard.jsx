import Marketplace from "./MArketPlace";

export default function ConsumerDashboard() {
  return (
    <div className="w-full bg-[#FFF3DD]/60">
      {/* Hero Section: Includes header height in viewport */}
      <div className="w-full mt-14 h-[90vh] pt-[8px] px-2">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          {/* Background Image */}
          <img
            src="https://img.lovepik.com/bg/20231217/Enhance-Your-Closet-Aesthetic-with-Wooden-Hangers-The-Perfect-Background_2494335_wh860.png"
            alt="Hero"
            className="w-full h-full object-cover rounded-xl"
            style={{ objectPosition: "center" }}
          />

          {/* Scalloped Welcome Block using clip-path */}
          <div className="absolute bottom-10 right-10 z-10">
            <div
              className="bg-[#FFF3DD] px-12 py-10 shadow-xl border border-orange-300 text-center text-gray-800"
              style={{
                clipPath:
                  "polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%)",
                width: "380px",
                borderRadius: "40px",
              }}
            >
              <h2 className="text-3xl font-extrabold text-orange-600 mb-3 leading-tight">
                Welcome to <br /> Consumer Dashboard
              </h2>
              <p className="text-sm font-semibold text-gray-700 tracking-wide">
                Buy your favorite products with ease!
              </p>
            </div>
          </div>

          {/* Checkered Bottom Left Grid – Edge aligned */}
          <div className="absolute bottom-0 left-0 z-10 flex flex-wrap w-[150px]">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className={`w-[12px] h-[12px] ${
                  i % 2 === 0 ? "bg-[#FFF3DD]" : "bg-[#B19258]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="px-8 py-12 ">
        <h2 className="text-5xl font-semibold text-[#664D36] my-8">
          Featured Products
        </h2>
        <Marketplace />
      </div>
    </div>
  );
}
