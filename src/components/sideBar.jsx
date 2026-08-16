import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  PlusCircle,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/AdminDash",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Foods",
      path: "/admin/foods",
      icon: <UtensilsCrossed size={20} />,
    },
    {
      name: "Add Food",
      path: "/admin/AddFood",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">

      <div className="text-center py-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-orange-500">
          Admin Panel
        </h1>
      </div>

      <div className="flex-1 mt-6">

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-3 px-6 py-4 transition-all duration-200 hover:bg-orange-500
              ${
                location.pathname === menu.path
                  ? "bg-orange-500"
                  : ""
              } `}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </Link>
        ))}

      </div>

      <div className="p-5 border-t border-gray-700">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full flex items-center justify-center gap-2 bg-red-600 py-3 rounded-lg hover:bg-red-700"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;