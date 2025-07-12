import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RejectionModal from "../../../components/Modal/RejectionModal";
// import RejectionModal from "../../../components/Shared/RejectionModal";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { data: trainer, isLoading } = useQuery({
    queryKey: ["appliedTrainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!trainer)
    return <p className="text-center text-red-500 py-10">Trainer not found</p>;

  const handleConfirm = async () => {
    try {
      await axiosSecure.patch(`/confirm-trainer/${id}`);
      toast.success("Trainer confirmed successfully!");
      queryClient.invalidateQueries(["appliedTrainers"]);
      navigate("/dashboard/applied-trainers");
    } catch (error) {
      toast.error("Failed to confirm trainer.");
    }
  };

  const handleReject = async () => {
    try {
      await axiosSecure.post(`/reject-trainer/${id}`, { feedback });
      toast.success("Trainer rejected.");
      setRejectModalOpen(false);

      // ✅ Refresh both lists and this single detail view
      queryClient.invalidateQueries(["appliedTrainers"]);
      queryClient.invalidateQueries(["appliedTrainer", id]);

      navigate("/dashboard/applied-trainers"); // optional: redirect
    } catch (error) {
      toast.error("Failed to reject trainer.");
    }
  };

  return (
    <div className="max-w-6xl bg-gray-100 mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg p-6 shadow col-span-full lg:col-span-1"
      >
        <h2 className="text-2xl font-bold text-lime-600 mb-2">Trainer Info</h2>
        <p className="text-sm text-gray-600">
          Review and manage the trainer’s application. You can confirm or reject
          based on the provided information.
        </p>
      </motion.div>

      {/* Trainer Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="col-span-full lg:col-span-3 bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <img
          className="w-full h-52 object-cover"
          src={trainer.profileImage}
          alt={trainer.name}
        />
        <div className="flex items-center px-6 py-4 bg-lime-700">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-6 2.69-6 6v1h12v-1c0-3.31-2.67-6-6-6z"
            />
          </svg>
          <h1 className="ml-3 text-lg font-semibold text-white">
            {trainer.name}
          </h1>
        </div>

        <div className="px-6 py-5 space-y-2 text-gray-700 text-sm">
          <p>
            <span className="font-medium">Email:</span> {trainer.email}
          </p>
          <p>
            <span className="font-medium">Age:</span> {trainer.age}
          </p>
          <p>
            <span className="font-medium">Skills:</span>{" "}
            {trainer.skills?.join(", ") || "None"}
          </p>
          <p>
            <span className="font-medium">Available Days:</span>{" "}
            {trainer.availableDays?.join(", ") || "N/A"}
          </p>
          <p>
            <span className="font-medium">Available Time:</span>{" "}
            {trainer.availableTime || "N/A"}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="capitalize text-yellow-600">{trainer.status}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 flex justify-center gap-4 border-t border-gray-200">
          <button
            onClick={handleConfirm}
            className="bg-lime-600 text-sm hover:bg-lime-700 text-white px-4 py-2 rounded-md font-medium transition"
          >
            ✅ Confirm
          </button>
          <button
            onClick={() => setRejectModalOpen(true)}
            className="border text-sm border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md font-medium transition"
          >
            ❌ Reject
          </button>
        </div>
      </motion.div>

      {/* Rejection Modal */}
      <RejectionModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onSubmit={handleReject}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    </div>
  );
};

export default TrainerDetails;
