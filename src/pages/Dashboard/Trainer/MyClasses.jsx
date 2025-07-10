import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const MyClasses = () => {
  const { user } = useAuth();

  const { data: slots = [], refetch } = useQuery({
    queryKey: ["trainer-slots", user.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/slots/trainer/${user.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure to delete this slot?");
    if (!confirmed) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/slots/${id}`);
    toast.success("Slot deleted!");
    refetch();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Classes / Slots</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Time</th>
              <th>Days</th>
              <th>Class</th>
              <th>Status</th>
              <th>Booked By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td>{slot.slotName}</td>
                <td>{slot.slotTime}</td>
                <td>{slot.selectedDays?.join(", ")}</td>
                <td>{slot.className}</td>
                <td>{slot.isBooked ? "Booked" : "Available"}</td>
                <td>{slot.bookedBy?.email || "-"}</td>
                <td>
                  {!slot.isBooked && (
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
