import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaUtensils,
} from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/users/login", loginData);

      const token = res.data.token;

      localStorage.setItem("token", token);

      const user = jwtDecode(token);

      toast.success("Login Successful");

      if (user.role === "admin") {
        navigate("/AdminDash");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-12">

      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl md:grid-cols-2">

          {/* Left Side */}
          <div className="hidden flex-col justify-center bg-gradient-to-br from-orange-500 to-red-500 p-10 text-white md:flex">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">
              <FaUtensils />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight">
              Welcome Back
            </h1>

            <p className="mt-4 max-w-sm leading-7 text-orange-100">
              Your favourite meals are just a few clicks away. Login and
              continue your delicious journey.
            </p>

          </div>

          {/* Login Form */}
          <div className="p-7 sm:p-10">

            <div className="mb-8 text-center md:text-left">

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-xl text-orange-500 md:hidden">
                <FaUtensils />
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900">
                Login
              </h1>

              <p className="mt-2 text-gray-500">
                Welcome back! Please enter your details.
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                  />

                </div>

              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-md shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg"
              >
                Login

                <FaArrowRight className="transition group-hover:translate-x-1" />

              </button>

            </form>

            <p className="mt-7 text-center text-sm text-gray-500">

              Don't have an account?

              <Link
                to="/signup"
                className="ml-2 font-semibold text-orange-500 hover:text-orange-600"
              >
                Create Account
              </Link>

            </p>
            <div className="text-right">
              <a href="/forget-password" className="text-orange-600 hover:underline">
              
              forgot Password.?
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;