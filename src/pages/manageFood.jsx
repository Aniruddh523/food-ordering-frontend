  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import toast from "react-hot-toast";
  import API from "../services/api";
  import Sidebar from "../components/sideBar";
  import AdminNavbar from "../components/adminNavbar";

  function ManageFoods() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchFoods();
    }, []);

    const fetchFoods = async () => {
      try {
        const res = await API.get("/api/Food/getAllFood");
        setFoods(res.data.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch foods");
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (id) => {
      if (!window.confirm("Delete this food item?")) return;

      try {
        await API.delete(`/api/Food/deleteFood/${id}`);

        toast.success("Food Deleted Successfully");
        fetchFoods();
      } catch (err) {
        console.log(err);
        toast.error("Delete Failed");
      }
    };

    if (loading) {
      return (
        <h1 className="text-center text-3xl font-bold mt-20">
          Loading...
        </h1>
      );
    }

    console.log(foods);
    


    return (
      <div className="flex min-h-screen bg-gray-100">

        <Sidebar />

        <div className="flex-1">

          <AdminNavbar />

          <div className="p-8">

            <div className="flex justify-between items-center mb-8">

              <h1 className="text-3xl font-bold">
                Manage Foods
              </h1>

              <Link
                to="/admin/addFood"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg"
              >
                + Add Food
              </Link>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full bg-white rounded-xl shadow-lg">

                <thead className="bg-orange-500 text-white">

                  <tr>
                    <th className="p-4">Image</th>
                    <th>Name</th>
                    <th>Food Type</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {foods.length > 0 ? (
                    foods.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b text-center hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg mx-auto"
                          />
                        </td>

                        <td>{item.name}</td>

                        <td>{item.food}</td>

                        <td>{item.category}</td>

                        <td>₹ {item.price}</td>

                        <td>{item.rating} ⭐</td>

                        <td>
                          {item.avaiable ? (
                            <span className="text-green-600 font-semibold">
                              Available
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              Not Available
                            </span>
                          )}
                        </td>

                        <td className="space-x-2">

                          <Link
                            to={`/admin/updateFood/${item._id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-8 text-center text-xl text-gray-500"
                      >
                        No Food Found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    );
  }

  export default ManageFoods;