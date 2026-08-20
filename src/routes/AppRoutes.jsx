import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../components/navbar";

import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import FoodDetails from "../pages/foodDetails";
import Cart from "../pages/cart";
import CheckOut from "../pages/chekOut";
import Order from "../pages/orders";
import Profile from "../pages/profile";
import AdminDash from "../pages/adminDash";
import NotFound from "../pages/notFound";

import ManageFoods from "../pages/manageFood";
import AddFood from "../pages/addFood";
import EditFood from "../pages/eaditFood";
import ManageOrders from "../pages/manageOrder";
import ManageUsers from "../pages/mangeUser";

import AdminProtectedRoute from "../components/adminProtect";

import ForgotPassword from "../pages/forgetPassword"
import VerifyOTP from "../pages/verifyOTP";
import ResetPassword from "../pages/resetPassword";

const AppRoutes = () => {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/AdminDash") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* all routes */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/foodDetails" element={<FoodDetails />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/forget-password" element={<ForgotPassword/>}/>
         <Route path="/verify-OTP" element={<VerifyOTP/>}/>
         <Route path="/reset-password" element={<ResetPassword/>}/>


        <Route
          path="/AdminDash"
          element={
            <AdminProtectedRoute>
              <AdminDash />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/foods"
          element={
            <AdminProtectedRoute>
              <ManageFoods />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/addFood"
          element={
            <AdminProtectedRoute>
              <AddFood />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/updateFood/:id"
          element={
            <AdminProtectedRoute>
              <EditFood />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <ManageOrders />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <ManageUsers />
            </AdminProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;