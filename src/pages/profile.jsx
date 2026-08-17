import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaEdit,
  FaSave,
  FaTrash,
  FaSignOutAlt,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

import API from "../services/api";
import toast from "react-hot-toast";

function Profile() {
  const Navigate = useNavigate();

  const [user, setuser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const [eadit, setEadit] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/users/getProfile");

      setuser(res.data.user);

    toast.success("Your Profile");
    } catch (err) {
      console.log(err);

      toast.error("Unauthorized");

      Navigate("/login");
    }
  };

  const handelChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      await API.put("/api/users/updateProfile", {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      });

      toast.success("Profile Updated Successfully");

      setEadit(false);
    } catch (err) {
      toast.error("Update Failed");

      console.log(err);
    }
  };

  const deleteProfile = async () => {
    const ConfromDelete = window.confirm(
      "Are You Sure You Want To Delete Your Account?"
    );

    if (!ConfromDelete) {
      return;
    }

    try {
      await API.delete("/api/users/deleteProfile");

      localStorage.removeItem("token");

      toast.success("Account Deleted");

      Navigate("/signup");
    } catch (err) {
      toast.error("Delete Failed");

      console.log(err);
    }
  };

  const logout = async () => {
    const log = window.confirm("You want to logout?");

    if (!log) {
      return;
    }

    try {
      localStorage.removeItem("token");

      toast.success("Logout Successful");

      Navigate("/login");
    } catch (err) {
      console.log(err);

      toast.error("Logout Failed");
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-50 px-4 py-5">

    {/* Main Container */}
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">

      {/* Profile Card */}
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

        {/* Top Banner */}
        <div className="relative h-24 bg-gradient-to-r from-[#ff7a18] via-[#ff5a3c] to-[#e23744]">

          {/* Avatar */}
          <div className="absolute -bottom-8 left-8 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-white text-2xl text-[#e23744] shadow-lg">
            <FaUser />
          </div>

        </div>
         {/* Content */}
<div className="p-6 pt-12">

  {/* Profile Header */}
  <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        {user.name || "User"}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {user.email || "your@email.com"}
      </p>
    </div>

    {!eadit ? (
      <button
        onClick={() => setEadit(true)}
        className="flex items-center justify-center gap-2 rounded-full
         bg-gradient-to-r from-[#ff7a18] to-[#e23744] px-5 py-2.5 text-sm font-semibold
          text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <FaEdit className="text-base" />
        Edit Profile
      </button>      
      
  ) : (
  <button
    onClick={updateProfile}
    className="flex items-center justify-center gap-2 rounded-full
     bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md 
     transition-all duration-300 hover:scale-105 hover:bg-green-700"
  >
    <FaSave className="text-base" />
    Save Changes
  </button>
)}

</div>

{/* Form Grid */}
<div className="grid grid-cols-1 gap-5 md:grid-cols-2">

  {/* Name */}
  <div>
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
      <FaUser className="text-[#e23744]" />
      Full Name
    </label>

    <input
      type="text"
      name="name"
      value={user.name || ""}
      disabled={!eadit}
      onChange={handelChange}
      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
        eadit
          ? "border-gray-300 bg-white text-gray-800 focus:border-[#e23744] focus:ring-2 focus:ring-red-100"
          : "border-gray-200 bg-gray-50 text-gray-500"
      }`}
    />
  </div>

  {/* Email */}
  <div>
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
      <FaEnvelope className="text-[#e23744]" />
      Email Address
    </label>

    <input
      type="email"
      name="email"
      value={user.email || ""}
      disabled={!eadit}
      onChange={handelChange}
      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
        eadit
          ? "border-gray-300 bg-white text-gray-800 focus:border-[#e23744] focus:ring-2 focus:ring-red-100"
          : "border-gray-200 bg-gray-50 text-gray-500"
      }`}
    />
  </div>

  {/* Address */}
  <div>
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
      <FaMapMarkerAlt className="text-[#e23744]" />
      Address
    </label>

    <input
      type="text"
      name="address"
      value={user.address || ""}
      disabled={!eadit}
      onChange={handelChange}
      placeholder="Enter your address"
      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
        eadit
          ? "border-gray-300 bg-white text-gray-800 focus:border-[#e23744] focus:ring-2 focus:ring-red-100"
          : "border-gray-200 bg-gray-50 text-gray-500"
      }`}
    />
  </div>

  {/* Phone */}
  <div>
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
      <FaPhone className="text-[#e23744]" />
      Phone Number
    </label>

    <input
      type="text"
      name="phone"
      value={user.phone || ""}
      disabled={!eadit}
      onChange={handelChange}
      placeholder="Enter your phone number"
      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
        eadit
          ? "border-gray-300 bg-white text-gray-800 focus:border-[#e23744] focus:ring-2 focus:ring-red-100"
          : "border-gray-200 bg-gray-50 text-gray-500"
      }`}
    />
  </div>
</div>

{/* Account Overview */}
<div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">

  <h3 className="mb-4 text-base font-semibold text-gray-800">
    Account Overview
  </h3>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

    {/* Status */}
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
        <FaCheckCircle />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">
          Account Active
        </p>

        <p className="text-xs text-gray-500">
          Your account is verified
        </p>
      </div>

    </div>

    {/* Security */}
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
        <FaLock />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">
          Security
        </p>

        <p className="text-xs text-gray-500">
          Password protected
        </p>
      </div>

    </div>

  </div>

</div>




{/* Account Actions */}
            <div className="mt-5 border-t border-white/10 pt-5">

              <h3 className="mb-3 text-lg font-bold text-white">
                Account Actions
              </h3>

              <div className="flex flex-col gap-4 sm:flex-row">

                <button
                  onClick={logout}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-700 px-5 py-2.5 font-semibold text-white transition duration-300 hover:bg-gray-600"
                >
                  <FaSignOutAlt />
                  Logout
                </button>

                <button
                  onClick={deleteProfile}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600/90 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"
                >
                  <FaTrash />
                  Delete Account
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile; 