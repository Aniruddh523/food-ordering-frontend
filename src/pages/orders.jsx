import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/order/getMyOrders");

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-orange-500">
          Loading Orders...
        </h2>
      </div>
    );
  }


  // cancel 


  const cancelOrder = async (id) => {

  const result = await Swal.fire({
    title: "Cancel Order?",
    text: "Are you sure you want to cancel this order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#3b82f6",
    confirmButtonText: "Yes, Cancel",
  });

  if (!result.isConfirmed) return;

  try {

    const res = await API.put(`/api/order/cancel/${id}`);

    toast.success(res.data.message);

    // Reload Orders
    fetchOrders();

  } catch (err) {

    console.log(err);

    toast.error(
      err.response?.data?.message || "Unable to cancel order"
    );

  }
};

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <h2 className="text-2xl font-bold text-gray-600">
              No Orders Found
            </h2>

            <p className="text-gray-400 mt-2">
              Your ordered food will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md border border-orange-100 p-6"
              >

                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <h2 className="font-semibold text-gray-800 break-all">
                      {order._id}
                    </h2>

                  </div>

                  <span
                    className={`self-start px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <div className="border-t border-gray-100 pt-5 space-y-3">

                  <p className="text-gray-700">
                    <strong>Payment:</strong>{" "}
                    {order.payment}
                  </p>

                  <p className="text-gray-700">
                    <strong>Address:</strong>{" "}
                    {order.address}
                  </p>

                  <p className="text-gray-700">
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString("en-GB")}
                  </p>

                </div>

                {/* Ordered Foods */}
                <div className="mt-6">

                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Ordered Foods
                  </h3>

                  <div className="space-y-3">

                    {order.foods.map((food, index) => (

                      <div
                        key={index}
                        className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3"
                      >

                        <div>

                          <p className="font-semibold text-gray-800">
                            {food.food?.name || "Food Item"}
                          </p>

                          <p className="text-sm text-gray-500">
                            Quantity: {food.quantity}
                          </p>

                        </div>

                        <p className="font-bold text-orange-600">
                          ₹{food.food?.price || 0}
                        </p>





                        <p className="font-semibold">
  Status :
  <span className="text-orange-500 ml-2">
    {order.status}
  </span>
</p>

{
  (order.status === "pending" ||
   order.status === "preparing") && (

    <button
      onClick={() => cancelOrder(order._id)}
      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
    >
      Cancel Order
    </button>

  )
}

{
  order.status === "cancelled" && (

    <button
      disabled
      className="mt-4 bg-gray-500 text-white px-5 py-2 rounded-lg cursor-not-allowed"
    >
      Cancelled
    </button>

  )
}

{
  (order.status === "out for delivery" ||
   order.status === "delivered") && (

    <button
      disabled
      className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg cursor-not-allowed"
    >
      Cannot Cancel
    </button>

  )
}

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Orders;