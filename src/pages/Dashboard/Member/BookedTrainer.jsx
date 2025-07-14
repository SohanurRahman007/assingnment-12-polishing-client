import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ReviewModal from "../../../components/Modal/ReviewModal";

const BookedTrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookedTrainer = async () => {
      try {
        const res = await axiosSecure.get(
          `/booked-trainer?email=${user.email}`
        );
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching booked trainers:", error);
      }
    };

    fetchBookedTrainer();
  }, [user, axiosSecure]);

  const openReviewModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedBooking(null);
    setModalOpen(false);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-lime-600 mb-6">
        My Booked Trainers
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm bg-white">
            <thead className="bg-lime-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Trainer
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Slot
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Package
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Paid At
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-lime-50 transition duration-200"
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={
                        booking.trainerPhoto ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          booking.trainerName
                        )}`
                      }
                      alt={booking.trainerName}
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {booking.trainerName}
                      </p>
                      {/* <p className="text-xs text-gray-500">
                        {booking.email || "N/A"}
                      </p> */}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{booking.slot}</td>
                  <td className="px-6 py-4 text-gray-700">{booking.pack}</td>
                  <td className="px-6 py-4 text-gray-700">${booking.price}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(booking.paidAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openReviewModal(booking)}
                      className="px-4 py-1.5 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition duration-200 text-sm"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {modalOpen && selectedBooking && (
        <ReviewModal
          isOpen={modalOpen}
          trainerData={{
            name: selectedBooking.trainerName,
            email: selectedBooking.trainerEmail || "N/A",
            photo:
              selectedBooking.trainerPhoto ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                selectedBooking.trainerName
              )}`,
            slots: [selectedBooking.slot],
          }}
          onClose={closeReviewModal}
        />
      )}
    </div>
  );
};

export default BookedTrainer;
