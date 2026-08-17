import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../services/api";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
  try {
    const res = await API.get(`/api/food/getFood/${id}`);

    console.log("Food Data:", res.data);

    setFood(res.data);
  } catch (err) {
    console.log(err);
    toast.error("Failed to load food");
  } finally {
    setLoading(false);
  }
};
  const addToCart = async () => {
    try {
      await API.post("/api/cart/addCart", {
        food: food._id,
        quantity: 1,
        totalPrice: food.price,
      });

      toast.success("Added to Cart");
    } catch (err) {
      console.log(err);
      toast.error("Failed add to cart");
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl mt-20 font-bold">
        Loading...
      </h2>
    );
  }

  if (!food) {
    return (
      <h2 className="text-center text-2xl mt-20 font-bold">
        Food Not Found
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-500 font-semibold mb-8"
      >
        <FaArrowLeft />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <img
          src={food.image}
          alt={food.name}
          className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
        />

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            {food.name}
          </h1>

          <p className="text-gray-600 mt-5 leading-7">
            {food.description}
          </p>

          <div className="flex items-center gap-2 mt-5">
            <FaStar className="text-yellow-500" />
            <span className="text-lg">{food.rating}</span>
          </div>

          <p className="mt-5">
            <span className="font-semibold">
              Category :
            </span>{" "}
            {food.category}
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-8">
            ₹ {food.price}
          </h2>

          <button
            onClick={addToCart}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl flex items-center gap-3 transition"
          >
            <FaShoppingCart />
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default FoodDetails;