import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});

  const handleSelectRole = (userId, newRole) => {
    setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleConfirmRoleChange = async (userId) => {
    setUpdatingUserId(userId);
    try {
      const newRole = selectedRoles[userId];
      await axiosSecure.patch(`/users/${userId}`, { role: newRole });
      toast.success("✅ Role updated successfully");
      refetch();
    } catch (error) {
      toast.error("❌ Failed to update role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeactivate = async (userId, isActive) => {
    setUpdatingUserId(userId);
    try {
      await axiosSecure.patch(`/users/${userId}`, { active: !isActive });
      toast.success(isActive ? "User deactivated" : "User activated");
      refetch();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <h2 className="text-xl md:text-2xl text-lime-500 font-bold mb-4">
        Manage Users
      </h2>
      <table className="w-full border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Role</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const selectedRole = selectedRoles[user._id] || user.role;

            return (
              <tr
                key={user._id}
                className="text-center border border-gray-300 bg-white"
              >
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleSelectRole(user._id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="admin">Admin</option>
                    <option value="trainer">Trainer</option>
                    <option value="member">Member</option>
                  </select>
                </td>
                <td className="p-2">
                  {user.active === false ? "Deactivated" : "Active"}
                </td>
                <td className="p-2 flex justify-center gap-2 flex-wrap">
                  <button
                    disabled={
                      updatingUserId === user._id || selectedRole === user.role
                    }
                    onClick={() => handleConfirmRoleChange(user._id)}
                    className="px-3 py-1 bg-lime-500 text-white rounded disabled:opacity-50 cursor-pointer"
                  >
                    Confirm
                  </button>
                  <button
                    disabled={updatingUserId === user._id}
                    onClick={() =>
                      handleDeactivate(user._id, user.active !== false)
                    }
                    className={`px-3 py-1 rounded ${
                      user.active === false
                        ? "bg-lime-500 text-white cursor-pointer"
                        : "bg-red-400 text-white cursor-pointer"
                    }`}
                  >
                    {user.active === false ? "Activate" : "Deactivate"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
