import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ReviewModal from "../../../components/Modal/ReviewModal";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const BookedTrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookedTrainer = async () => {
      try {
        setLoading(true); // start loading
        const res = await axiosSecure.get(
          `/booked-trainer?email=${user.email}`
        );
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching booked trainers:", error);
      } finally {
        setLoading(false); // stop loading
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 mt-6 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-lime-500">
        <span className="text-gray-800">My Booked</span> Trainers
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t booked any trainers yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
            <thead className="bg-lime-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Trainer
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Slot
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Package
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Paid At
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-lime-50 transition duration-200 "
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={
                        booking.trainerPhoto ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          booking.trainerName
                        )}&background=lime&color=fff`
                      }
                      alt={booking.trainerName}
                      className="w-12 h-12 rounded-full border-2 border-lime-200 shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {booking.trainerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.trainerEmail || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {booking.slot}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {booking.pack}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">
                    ${booking.price}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(booking.paidAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openReviewModal(booking)}
                      className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg shadow-sm transition duration-200 font-medium text-sm cursor-pointer"
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
              )}&background=lime&color=fff`,
            slots: [selectedBooking.slot],
          }}
          onClose={closeReviewModal}
        />
      )}
    </div>
  );
};

export default BookedTrainer;
