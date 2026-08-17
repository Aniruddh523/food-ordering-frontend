import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import  Sidebar from "../components/sideBar";
import AdminNavbar from "../components/adminNavbar";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/admin/orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await API.put(`/api/admin/orders/${id}`, {
        status,
      });

      toast.success("Order Status Updated");
      fetchOrders();
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl font-bold mt-20">
        Loading Orders...
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
            Manage Orders
          </h1>

          <div className="overflow-x-auto">

            <table className="w-full bg-white rounded-xl shadow-lg">

              <thead className="bg-orange-500 text-white">

                <tr>
                  <th className="p-4">Customer</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b text-center"
                  >

                    <td className="p-4">
                      {order.user?.name}
                    </td>

                    <td>
                      {order.user?.email}
                    </td>

                    <td>
                      ₹ {order.totalamount}
                    </td>

                    <td>
                      {order.payment}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-white
                        ${
                          order.status === "pending"
                            ? "bg-yellow-500"
                            : order.status === "preparing"
                            ? "bg-blue-500"
                            : order.status === "out for delivery"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td>
                      {new Date(order.date).toLocaleDateString()}
                    </td>

                    <td>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          changeStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg p-2"
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="preparing">
                          Preparing
                        </option>

                        <option value="out for delivery">
                          Out For Delivery
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageOrders;