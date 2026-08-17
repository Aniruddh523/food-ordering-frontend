import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/sideBar";
import AdminNavbar from "../components/adminNavbar";
import toast from "react-hot-toast";

function AdminDash() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalFoods: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/api/admin/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl font-bold mt-20">
        Loading Dashboard...
      </h1>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <AdminNavbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Dashboard Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-gray-500 text-lg">
                Total Users
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-4">
                {dashboard.totalUsers}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-gray-500 text-lg">
                Total Foods
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-4">
                {dashboard.totalFoods}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-gray-500 text-lg">
                Total Orders
              </h2>

              <p className="text-4xl font-bold text-orange-500 mt-4">
                {dashboard.totalOrders}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-gray-500 text-lg">
                Total Revenue
              </h2>

              <p className="text-4xl font-bold text-red-500 mt-4">
                ₹ {dashboard.totalRevenue}
              </p>
            </div>

          </div>

          <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-4">
              Welcome Admin 👋
            </h2>

            <p className="text-gray-600">
              From here you can manage foods, users, orders and monitor
              your restaurant performance.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDash;