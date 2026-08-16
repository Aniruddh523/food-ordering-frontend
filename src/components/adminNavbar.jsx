import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome Back 👋
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-3">
          <UserCircle size={40} className="text-orange-500" />

          <div>
            <h2 className="font-semibold">Admin</h2>
            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminNavbar;