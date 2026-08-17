import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
  

function Checkout() {
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    address: "",
    payment: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/api/order/placeOrder", orderData);

      toast.success("Order Placed Successfully");

      navigate("/order");
    } catch (err) {
      console.log(err);
      toast.error("Failed to Place Order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">
          Checkout
        </h1>

        <form onSubmit={placeOrder} className="space-y-6">

          <div>
            <label className="block font-semibold mb-2">
              Delivery Address
            </label>

            <textarea
              name="address"
              rows="4"
              required
              value={orderData.address}
              onChange={handleChange}
              placeholder="Enter your full address..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Payment Method
            </label>

            <select
              name="payment"
              value={orderData.payment}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Online">Online</option>
              
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;