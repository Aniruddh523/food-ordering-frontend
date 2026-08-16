import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaShoppingCart,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/90 text-white shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/20 transition duration-300 group-hover:scale-105">
              <FaUtensils className="text-lg text-white" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Just <span className="text-orange-500">Gets</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                Fresh • Fast • Delicious
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-2 md:flex">

            <Link
              to="/"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 transition duration-300 hover:bg-white/10 hover:text-orange-400"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 transition duration-300 hover:bg-white/10 hover:text-orange-400"
            >
              <FaShoppingCart className="text-sm transition group-hover:scale-110" />
              Cart
            </Link>

            <Link
              to="/order"
              className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 transition duration-300 hover:bg-white/10 hover:text-orange-400"
            >
              <FaClipboardList className="text-sm transition group-hover:scale-110" />
              Orders
            </Link>

            <Link
              to="/profile"
              className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-300 transition duration-300 hover:bg-white/10 hover:text-orange-400"
            >
              <FaUser className="text-sm transition group-hover:scale-110" />
              Profile
            </Link>

          </div>

          {/* Auth Button */}
          <Link
            to="/login"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/40"
          >
            Login
            <span className="transition duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;