// src/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[#664D36] text-[#FDF3DF] px-8 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-wide">
            INVENTORYApp
          </h2>
          <p className="mt-2 text-sm text-[#ccc]">Track, Manage, Grow.</p>
        </div>

        {/* Center - Links */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-semibold mb-1">Quick Links</h3>
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Our Materials
          </a>
          <a href="#" className="hover:underline">
            Our Story
          </a>
          <a href="#" className="hover:underline">
            Sustainability
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>

        {/* Right - Contact Info */}
        <div>
          <h3 className="font-semibold mb-2 text-sm">Stay in Touch</h3>
          <p className="text-sm text-[#ccc] mb-2">hello@xyz.com</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-[#FDF3DF] text-sm px-4 py-2 rounded outline-none border border-[#444] placeholder-[#aaa]"
          />
          <button className="mt-2 block bg-[#FDF3DF] text-black px-4 py-2 rounded font-semibold hover:bg-white transition">
            Subscribe
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-[#888] mt-10 border-t border-[#333] pt-6">
        © {new Date().getFullYear()} FITFLUX. All rights reserved.
      </div>
    </footer>
  );
}
