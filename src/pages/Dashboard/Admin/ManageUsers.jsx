import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import RemoveConfirmationModal from "../../../components/Modal/RemoveConfirmationModal";

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

  console.log(trainers);

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
    if (selectedTrainer) {
      removeTrainerMutation.mutate(selectedTrainer.email);
    }
    setIsModalOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-lime-700">Manage Trainers</h2>
        <p className="text-gray-600 mt-1">
          View, manage, or remove trainer roles from your platform with one
          click.
        </p>
      </div>

      {trainers.length === 0 ? (
        <div className="flex items-center gap-2 text-gray-600 bg-yellow-50 border border-yellow-300 px-4 py-3 rounded-md">
          <AlertTriangle className="text-yellow-600" />
          <span>No trainers found at this time.</span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-lime-100 text-lime-900 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Photo</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {trainers.map((trainer, index) => (
                <tr
                  key={trainer._id}
                  className="hover:bg-lime-50/50 transition duration-200"
                >
                  <td className="px-6 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3">
                    <img
                      src={trainer.photo}
                      alt={trainer.name + "'s profile"}
                      title={trainer.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-3">{trainer.name}</td>
                  <td className="px-6 py-3">{trainer.email}</td>
                  <td className="px-6 py-3 capitalize text-green-700 font-semibold">
                    {trainer.role}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => openModal(trainer)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition focus:outline-none focus:ring-2 focus:ring-red-300"
                      title="Remove Trainer Role"
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

      {/* Confirmation Modal */}
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
