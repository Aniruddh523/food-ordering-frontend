import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
    const navigate = useNavigate();
  return (
    
    <footer className="bg-gray-900 text-white mt-20">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-orange-500">
            FoodHub
          </h2>

          <p className="text-gray-300 mt-4 leading-7">
            Order your favourite food anytime, anywhere.
            Fast delivery, secure payment and delicious meals
            at your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <HashLink smooth  to="/#menu" className="hover:text-orange-500">
                Home
              </HashLink>
            </li>   

            <li>
              <Link to="/cart" className="hover:text-orange-500">
                Cart
              </Link>
            </li>

            <li>
              <Link to="/order" className="hover:text-orange-500">
                Orders
              </Link>
            </li>

            <li>
              <Link to="/profile" className="hover:text-orange-500">
                Profile
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">

            <p>📍 Praygraj, India</p>

            <p>📞 +91 9026694017</p>

            <p>📧 support@foodhub.com</p>

          </div>

        </div>

        {/* Newsletter */}
        <div>

          <h3 className="text-xl font-semibold mb-5">
            Newsletter
          </h3>

          <p className="text-gray-300 mb-4">
            Subscribe for latest offers and updates.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg text-orange-500 outline-none focus:ring-2"
          />

         <button
  onClick={() => navigate("/login")}
  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold transition"
>
  Subscribe
</button>

        </div>

      </div>

      {/* Social Icons */}

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} FoodHub. All Rights Reserved.
          </p>

          <div className="flex gap-5 text-xl mt-5 md:mt-0">

           

            <a href="https://www.instagram.com/yourr._.rudh?igsh=MTJscWJyY3RrODBrbg==" className="hover:text-orange-500">
              <FaInstagram />
            </a>

            

            <a href="https://www.linkedin.com/in/aniruddh-singh-6b3086380" className="hover:text-orange-500">
              <FaLinkedin />
            </a>

            <a href="https://github.com/Aniruddh523" className="hover:text-orange-500">
              <FaGithub />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;