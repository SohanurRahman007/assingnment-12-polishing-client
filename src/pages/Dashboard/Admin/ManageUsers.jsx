import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RemoveConfirmationModal from "../../../components/Modal/RemoveConfirmationModal";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter((user) => user.role === "trainer");
    },
  });

  const removeTrainerMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/trainers/remove-role/${email}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Trainer removed successfully!");
      queryClient.invalidateQueries(["allTrainers"]);
    },
    onError: () => {
      toast.error("Failed to remove trainer.");
    },
  });

  const openModal = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const confirmRemoveTrainer = () => {
    if (selectedTrainer) removeTrainerMutation.mutate(selectedTrainer.email);
    setIsModalOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className=" mx-auto mt-6 p-6">
      <Helmet>
        <title>Manage Users | FitSphere Dashboard</title>
        <meta
          name="description"
          content="Admin dashboard page to manage all users in FitSphere."
        />
      </Helmet>
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-lime-500">
          {" "}
          <span className="text-gray-800">Manage</span> Trainers
        </h2>
        <p className="text-gray-600 mt-2">
          View, manage, or remove trainer roles in your platform easily.
        </p>
      </div>

      {trainers.length === 0 ? (
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-700 px-5 py-4 rounded-lg shadow-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>No trainers found.</span>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-lime-50 text-lime-900 text-xs uppercase font-semibold tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Photo</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {trainers.map((trainer, index) => (
                <tr
                  key={trainer._id}
                  className="hover:bg-lime-50 transition duration-200 "
                >
                  <td className="px-6 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3">
                    <img
                      src={
                        trainer.photo ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          trainer.name
                        )}&background=lime&color=fff`
                      }
                      alt={trainer.name}
                      className="w-10 h-10 rounded-full border border-lime-200 shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {trainer.name}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{trainer.email}</td>
                  <td className="px-6 py-3 text-green-700 font-semibold capitalize">
                    {trainer.role}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => openModal(trainer)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition shadow-sm cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      <RemoveConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRemoveTrainer}
        trainerName={selectedTrainer?.name}
        isLoading={removeTrainerMutation.isPending}
      />
    </div>
  );
};

export default ManageUsers;
