// import React from "react';
import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart, FaArrowRight } from "react-icons/fa";

function FoodCard({ food, addToCart }) {
  return (
    <div
      id="menu"
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Food Image */}
      <div className="relative overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"></div>

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold capitalize text-white backdrop-blur-md">
          {food.category}
        </span>

        {/* Rating Badge */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-800 shadow-lg">
          <FaStar className="text-yellow-500" />
          {food.rating}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">

        {/* Food Name */}
        <h2 className="truncate text-2xl font-extrabold capitalize text-gray-900">
          {food.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
          {food.description}
        </p>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Price
            </p>

            <h3 className="mt-1 text-2xl font-extrabold text-orange-500">
              ₹{food.price}
            </h3>
          </div>

          <div className="rounded-xl bg-orange-50 px-3 py-2 text-center">
            <p className="text-xs text-gray-400">
              Status
            </p>

            <p className="text-sm font-semibold text-green-600">
              Available
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          {/* Add To Cart */}
          <button
            onClick={() => addToCart(food)}
            className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 font-semibold text-white shadow-md shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30"
          >
            <FaShoppingCart className="transition duration-300 group-hover/btn:scale-110" />
            Add Cart
          </button>

          {/* Details */}
          <Link
            to={`/food/${food._id}`}
            className="group/details flex flex-1 items-center justify-center gap-2 rounded-xl border border-orange-500 py-3 font-semibold text-orange-500 transition duration-300 hover:bg-orange-500 hover:text-white"
          >
            Details
            <FaArrowRight className="text-sm transition duration-300 group-hover/details:translate-x-1" />
          </Link>

        </div>

      </div>
    </div>
  );
}

export default FoodCard;