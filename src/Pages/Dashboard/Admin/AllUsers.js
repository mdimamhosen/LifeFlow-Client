import { useState } from "react";
import Swal from "sweetalert2";
import { FaLock, FaUnlock, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: usersData = [], refetch } = useQuery({
    queryKey: "users",
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allusers", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return data;
    },
  });

  const handleAction = async (id, updates) => {
    try {
      await axiosSecure.patch(`/users/${id}`, updates, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Action successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleBlock = (id, role, status) => {
    handleAction(id, { role, status: "inactive" });
  };

  const handleUnblock = (id, role, status) => {
    handleAction(id, { role, status: "active" });
  };

  const handleMakeVolunteer = (id, role, status) => {
    handleAction(id, { role: "Volunteer", status });
  };

  const handleMakeAdmin = (id, role, status) => {
    handleAction(id, { role: "Admin", status });
  };

  const filteredUsers = usersData.filter((user) => {
    if (filterStatus === "all") {
      return true;
    }
    return user.status === filterStatus;
  });

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    refetch();
  };

  return (
    <div className="mx-auto mb-12 overflow-x-hidden">
      <div className="flex mx-auto pt-12 text-3xl font-bold text-black pb-2 w-fit px-4 border-b-2 border-red-500">
        All Registered Users
      </div>
      <div className="filter-buttons flex gap-4 mx-auto justify-center bg-red-500 w-fit px-8 py-2 rounded-lg mb-8 w-fit mt-6">
        <label htmlFor="statusFilter" className="text-white font-semibold">
          Filter by Status:
        </label>
        <select
          className="rounded-lg bg-white text-black font-semibold px-4 py-2"
          id="statusFilter"
          onChange={handleFilterChange}
          value={filterStatus}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Blocked</option>
        </select>
      </div>
      <div className="overflow-x-auto overflow-y-auto max-w-[90vw] max-h-[80vh] mx-auto lg:mx-12 -mt-6  rounded-md border-[5px] border-red-500">
        <table className="table w-full">
          <thead className="bg-red-500 text-lg text-white font-semibold border-2 border-red-500">
            <tr>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Block User</th>
              <th className="px-4 py-2">Unblock User</th>
              <th className="px-4 py-2">Make Volunteer</th>
              <th className="px-4 py-2">Make Admin</th>
            </tr>
          </thead>
          <tbody className="text-sm font-semibold bg-red-200 bg-opacity-20 border-2 border-red-500">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className={`${
                    user.role === "Admin"
                      ? "cursor-not-allowed hidden border-b-2 border-red-500"
                      : "border-b-2 border-red-500"
                  }`}
                >
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    <img
                      src={user?.photo}
                      alt=""
                      className="w-12 h-12 rounded-lg border-2 border-red-500"
                    />
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    {user.status}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    <button
                      disabled={user.status === "inactive"}
                      onClick={() =>
                        handleBlock(user._id, user.role, "inactive")
                      }
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white rounded-lg px-2 py-1 font-semibold"
                    >
                      <FaLock /> Block
                    </button>
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    <button
                      disabled={user.status === "active"}
                      onClick={() =>
                        handleUnblock(user._id, user.role, "active")
                      }
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-lg px-2 py-1 font-semibold"
                    >
                      <FaUnlock /> Unblock
                    </button>
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    <button
                      disabled={user.role === "Volunteer"}
                      onClick={() =>
                        handleMakeVolunteer(user._id, "Volunteer", user.status)
                      }
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-2 py-1 font-semibold"
                    >
                      <FaUser /> Volunteer
                    </button>
                  </td>
                  <td className="px-4 py-2 border-r-2 border-red-500">
                    <button
                      disabled={user.role === "Admin"}
                      onClick={() =>
                        handleMakeAdmin(user._id, "Admin", user.status)
                      }
                      className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg px-2 py-1 font-semibold"
                    >
                      <MdAdminPanelSettings className="text-xl" /> Admin
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-2xl py-6">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
