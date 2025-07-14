import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ReviewModal from "../../../components/Modal/ReviewModal";

const BookedTrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  // Modal state
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
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Booked Trainers</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Trainer</th>
                <th className="px-4 py-2 border">Slot</th>
                <th className="px-4 py-2 border">Package</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Paid At</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border flex items-center gap-3">
                    <img
                      src={
                        booking.trainerPhoto ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          booking.trainerName
                        )}`
                      }
                      alt={booking.trainerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{booking.trainerName}</p>
                      <p className="text-xs text-gray-500">
                        {booking.trainerEmail || "no-email@example.com"}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{booking.slot}</td>
                  <td className="px-4 py-2 border">{booking.pack}</td>
                  <td className="px-4 py-2 border">${booking.price}</td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.paidAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => openReviewModal(booking)}
                      className="text-sm px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
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
            email: selectedBooking.trainerEmail || "no-email@example.com",
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
