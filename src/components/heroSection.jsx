import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaUtensils } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* Background Decoration */}
      <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl"></div>

      <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-red-100/40 blur-3xl"></div>

      {/* Main Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 py-14 md:flex-row md:py-20">

        {/* Left Content */}
        <div className="max-w-xl text-center md:text-left">

          {/* Small Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">

            <FaUtensils />

            <span>
              Fresh • Fast • Delicious
            </span>

          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">

            Delicious Food

            <span className="block text-orange-500">
              Delivered To You
            </span>

          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">

            Discover delicious meals from your favourite restaurants.
            Fresh food, fast delivery, and unforgettable taste — all in one place.

          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">

           <HashLink
  smooth
  to="/#menu"
  className="group flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg"
>
  Explore Menu
  <FaArrowRight className="text-sm transition duration-300 group-hover:translate-x-1" />
</HashLink>

            <Link
              to="/cart"
              className="rounded-xl border border-orange-500 bg-white px-6 py-3 text-center font-semibold text-orange-600 transition duration-300 hover:bg-orange-50"
            >
              Order Now
            </Link>

          </div>

        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">

          {/* Image Glow */}
          <div className="absolute inset-4 rounded-full bg-orange-300/30 blur-3xl"></div>

          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700"
            alt="Delicious Food"
            className="relative h-[280px] w-[280px] rounded-[2rem] object-cover shadow-2xl transition duration-500 hover:scale-105 sm:h-[350px] sm:w-[350px]"
          />

          {/* Floating Badge */}
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl">

            <p className="text-xs text-gray-500">
              Today's Special
            </p>

            <p className="font-bold text-orange-500">
              Fresh & Delicious 🍕
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;