import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data: slots = [], refetch } = useQuery({
    queryKey: ["trainerSlots", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/trainer/${user.email}`);
      return res.data;
    },
  });

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    const res = await axiosSecure.delete(`/slots/${deleteId}`);
    if (res.data.deletedCount > 0) {
      toast.success("Slot deleted successfully");
      refetch();
    } else {
      toast.error("Failed to delete slot");
    }
    setIsOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-lime-500 mb-6">
        Manage My Slots
      </h2>
      <div className="overflow-x-auto rounded-xl">
        <table
          className="table w-full border border-lime-500 rounded-xl
         text-center"
        >
          <thead className=" text-lime-800">
            <tr>
              <th>#</th>
              <th>Slot Name</th>
              <th>Time</th>
              <th>Days</th>
              <th>Booked</th>
              <th>Booked By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={slot._id} className="hover:bg-white">
                <td>{index + 1}</td>
                <td>{slot.slotName}</td>
                <td>{slot.slotTime}</td>
                <td>{slot.days?.join(", ")}</td>
                <td>
                  {slot.booked ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
                <td>{slot.bookedBy || "—"}</td>
                <td>
                  <button
                    onClick={() => confirmDelete(slot._id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {slots.length === 0 && (
              <tr>
                <td colSpan={7} className="text-gray-500 py-4">
                  No slots added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Delete Confirmation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 ">
          <div className="bg-gray-200 rounded-lg  shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this slot? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;
