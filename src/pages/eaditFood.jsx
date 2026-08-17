import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import Sidebar from "../components/sideBar";
import AdminNavbar from "../components/adminNavbar";

function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    description: "",
    food: "",
    price: "",
    category: "",
    image: "",
    rating: "",
    avaiable: true,
  });

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const res = await API.get(`/api/food/getFood/${id}`);

      setFood(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load food");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "avaiable") {
      setFood({
        ...food,
        avaiable: value === "true",
      });
    } else {
      setFood({
        ...food,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Food:", food);

    try {
      await API.put(`/api/food/updateFood/${id}`, food);

      toast.success("Food Updated Successfully");

      navigate("/admin/foods");
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <AdminNavbar />

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-10 p-8">
          <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
            Edit Food
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={food.name}
              onChange={handleChange}
              placeholder="Food Name"
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              name="description"
              value={food.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border rounded-lg p-3"
              rows="4"
              required
            />

            <input
              type="text"
              name="food"
              value={food.food}
              onChange={handleChange}
              placeholder="Food Type"
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="price"
              value={food.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border rounded-lg p-3"
              required
            />

            <select
              name="category"
              value={food.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Category</option>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="Momos">Momos</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
              <option value="paniPuri">Pani Puri</option>
            </select>

            <input
              type="url"
              name="image"
              value={food.image}
              onChange={handleChange}
              placeholder="Direct Image URL"
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="rating"
              value={food.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="w-full border rounded-lg p-3"
              min="0"
              max="5"
              step="0.1"
            />

            <select
              name="avaiable"
              value={food.avaiable.toString()}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Update Food
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFood;