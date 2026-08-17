import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import Sidebar from "../components/sideBar";
import AdminNavbar from "../components/adminNavbar";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/admin/users/${id}`);

      toast.success("User Deleted Successfully");

      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl font-bold mt-20">
        Loading Users...
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
            Manage Users
          </h1>

          <div className="overflow-x-auto">

            <table className="w-full bg-white shadow-lg rounded-xl">

              <thead className="bg-orange-500 text-white">

                <tr>
                  <th className="p-4">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b text-center hover:bg-gray-50"
                  >

                    <td className="p-4 font-semibold">
                      {user.name}
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          user.role === "admin"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>{user.address}</td>

                    <td>{user.phone}</td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td>

                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

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

export default ManageUsers;