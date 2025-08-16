import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
// import RejectionModal from "../../components/Shared/RejectionModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FeedbackModal from "../../../components/Modal/FeedbackModal";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ActivityLog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const openModal = (msg) => {
    setSelectedMessage(msg);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedMessage("");
    setShowModal(false);
  };

  const { data: rejected = [], isLoading } = useQuery({
    queryKey: ["rejectedTrainers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rejected-trainers?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-red-500">
        ❌ Rejected Trainer Applications
      </h2>

      {rejected.length === 0 ? (
        <p>No rejected applications yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {rejected.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white rounded-lg shadow p-4 space-y-2 border-l-4 border-red-400"
            >
              <div className="flex items-center gap-4">
                <img
                  src={trainer.profileImage}
                  alt={trainer.name}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="font-bold">{trainer.name}</h3>
                  <p className="text-sm text-gray-500">{trainer.email}</p>
                </div>
              </div>
              <p>
                <span className="font-medium">Skills:</span>{" "}
                {trainer.skills?.join(", ") || "N/A"}
              </p>
              <button
                onClick={() => openModal(trainer.feedback)}
                className="text-sm text-lime-500 underline hover:text-lime-600 cursor-pointer"
              >
                View Feedback
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showModal}
        onClose={closeModal}
        message={selectedMessage}
      />
    </div>
  );
};

export default ActivityLog;
