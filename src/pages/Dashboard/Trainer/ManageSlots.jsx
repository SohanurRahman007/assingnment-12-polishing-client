import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import DeleteSlotModal from "../../../components/Modal/DeleteSlotModal";
// import DeleteSlotModal from "../../../components/DeleteSlotModal";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    data: slots = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trainerSlotsBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/bookings/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Open modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  // Delete handler
  const handleDelete = async () => {
    try {
      const res = await axiosSecure.delete(`/slots/${deleteId}`);
      if (res.data.deletedCount > 0) {
        toast.success("Slot deleted successfully!");
        refetch();
      } else {
        toast.error("Failed to delete slot.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting slot.");
    } finally {
      closeModal();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-lime-500"></span>
        <p className="text-xl text-gray-700 ml-3">Loading slots...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 p-8">
        <h3 className="text-2xl font-bold">Error Loading Slots</h3>
        <p className="text-lg">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-lime-600 mb-8 text-center">
        Manage My Slots
      </h2>
      <div className="overflow-x-auto rounded-xl border border-lime-500 bg-white shadow-inner">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-lime-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                Slot Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                Days
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                Booked
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                Booked By
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                Class Booked
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-lime-800 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {slots.length > 0 ? (
              slots.map((slot, index) => {
                const classesBookedMap = {};
                slot.bookings?.forEach((b) => {
                  const className = b.className || "Unnamed Class";
                  if (!classesBookedMap[className])
                    classesBookedMap[className] = [];
                  classesBookedMap[className].push(b);
                });

                return (
                  <tr key={slot._id} className="hover:bg-lime-50">
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{slot.slotName}</td>
                    <td className="px-4 py-4">{slot.slotTime}</td>
                    <td className="px-4 py-4">
                      {slot.days?.join(", ") || "N/A"}
                    </td>
                    <td className="px-4 py-4">
                      {slot.bookings?.length > 0 ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Yes ({slot.bookings.length})
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {slot.bookings?.length ? (
                        <div className="flex flex-col max-h-24 overflow-y-auto custom-scrollbar pr-2">
                          {slot.bookings.map((b, i) => (
                            <div
                              key={i}
                              className="bg-lime-50 p-2 rounded border border-lime-100 text-sm"
                            >
                              {b.name}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {Object.keys(classesBookedMap).length > 0 ? (
                        <div className="flex flex-col max-h-24 overflow-y-auto custom-scrollbar pr-2">
                          {Object.entries(classesBookedMap).map(
                            ([name, bookings], i) => (
                              <div
                                key={i}
                                className="bg-blue-50 p-2 rounded border border-blue-100 text-sm"
                              >
                                {name}{" "}
                                {bookings.length > 1 && (
                                  <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                                    ({bookings.length})
                                  </span>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => confirmDelete(slot._id)}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        <FaTrashAlt className="mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center px-4 py-6 text-gray-500">
                  You haven't added any slots yet or no bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Reusable Delete Modal */}
      <DeleteSlotModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
        slotId={deleteId}
      />

      {/* Scrollbar Style */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a7f3d0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #86efac;
        }
      `}</style>
    </div>
  );
};

export default ManageSlots;
