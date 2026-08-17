import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowRight,
  FaUtensils,
} from "react-icons/fa";

import API from "../services/api";
import toast from "react-hot-toast";

function Signup() {
  const Naviagte = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handelChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/users/signup", user);

      toast.success("Signup Successfully");

      Naviagte("/login");
    } catch (err) {
      toast.error("Signup Failed");

      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-10">

      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl md:grid-cols-2">

          {/* Left Side */}
          <div className="hidden flex-col justify-center bg-gradient-to-br from-orange-500 to-red-500 p-10 text-white md:flex">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">
              <FaUtensils />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight">
              Join Our Food Journey
            </h1>

            <p className="mt-4 max-w-sm leading-7 text-orange-100">
              Create your account and discover delicious food delivered
              straight to your doorstep.
            </p>

          </div>

          {/* Signup Form */}
          <div className="p-7 sm:p-10">

            <div className="mb-7 text-center md:text-left">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-xl text-orange-500 md:hidden">
                <FaUtensils />
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900">
                Create Account
              </h1>

              <p className="mt-2 text-gray-500">
                Start your delicious journey with us.
              </p>

            </div>

            <form onSubmit={handelSubmit} className="space-y-4">

              {/* Name */}
              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={user.name}
                  required
                  onChange={handelChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* Email */}
              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={user.email}
                  required
                  onChange={handelChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* Password */}
              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  required
                  onChange={handelChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* Address */}
              <div className="relative">

                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={user.address}
                  required
                  onChange={handelChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* Phone */}
              <div className="relative">

                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number"
                  value={user.phone}
                  required
                  minLength="10"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  onChange={handelChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* Button */}
              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-md shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg"
              >
                Create Account

                <FaArrowRight className="transition group-hover:translate-x-1" />

              </button>

            </form>

            <p className="mt-6 text-center text-sm text-gray-500">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 font-semibold text-orange-500 hover:text-orange-600"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;