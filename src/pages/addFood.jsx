import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import Sidebar from "../components/sideBar";
import AdminNavbar from "../components/adminNavbar";

function AddFood() {
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    description: "",
    food: "",
    category: "",
    price: "",
    image: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/api/food/addFood", food);

      toast.success("Food Added Successfully");

      navigate("/admin/foods");
    } catch (err) {
      console.log(err);
      toast.error("Failed To Add Food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <AdminNavbar />

        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
            Add New Food
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={food.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={food.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="food"
              placeholder="Food Type"
              value={food.food}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <select
              name="category"
              value={food.category}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            >
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="Momos">Momos</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
            <option value="paniPuri">Pani Puri</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={food.price}
              onChange={handleChange}
              required
              min="1"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={food.image}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={food.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
              step="0.1"
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Adding..." : "Add Food"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFood;