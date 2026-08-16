import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);

    if (user.role !== "admin") {
      return <Navigate to="/profile" replace />;
    }

    return children;
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}

export default AdminProtectedRoute;