import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { UserPlus, User, ShoppingCart } from "lucide-react";

export default function Header() {
  const { user, role } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setShowDropdown(false);
        window.location.href = "/login"; //  force redirect to login
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <Link to="/" className="text-xl font-bold text-purple-600">
        InventoryApp
      </Link>

      <div className="flex items-center space-x-4">
        {/* Show cart only for consumer */}
        {user && role === "consumer" && (
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
          </Link>
        )}

        {/* User Profile / Login */}
        {!user ? (
          <Link to="/login">
            <UserPlus className="text-purple-600 w-6 h-6" />
          </Link>
        ) : (
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <User className="text-purple-600 w-6 h-6" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-10 text-sm">
                <div className="p-4 border-b">
                  <p className="font-bold">
                    Hello {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user.phoneNumber || user.email}
                  </p>
                </div>
                <ul className="divide-y">
                  <li className="p-3 hover:bg-gray-100">
                    <Link to="/profile">Edit Profile</Link>
                  </li>
                  <li
                    className="p-3 hover:bg-gray-100 text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
