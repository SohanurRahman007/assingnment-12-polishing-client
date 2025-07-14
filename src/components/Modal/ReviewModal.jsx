import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth"; // ✅ import this to access logged-in user

const ReviewModal = ({ isOpen, trainerData, onClose }) => {
  const { user } = useAuth(); // ✅ get user info
  const axiosSecure = useAxiosSecure();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      trainerId: trainerData?._id,
      trainerName: trainerData.name,
      trainerEmail: trainerData.email,
      photo: trainerData.photo,
      feedback,
      rating,
      submittedAt: new Date(),
      // ✅ Include reviewer info
      reviewerName: user?.displayName || "Anonymous",
      reviewerEmail: user?.email,
      reviewerPhoto: user?.photoURL || "https://i.ibb.co/sy3h0kK/user.png",
    };

    try {
      setLoading(true);
      await axiosSecure.post("/reviews", reviewData);
      onClose(); // Close modal
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white dark:bg-gray-800 p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Review {trainerData.name}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={starValue}
                      className="hidden"
                      onClick={() => setRating(starValue)}
                    />
                    <FaStar
                      size={24}
                      className={`cursor-pointer transition ${
                        starValue <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>

            {/* Feedback */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Feedback
              </label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white dark:border-gray-700"
                placeholder="Write your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
