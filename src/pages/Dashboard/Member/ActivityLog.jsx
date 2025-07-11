import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
import { Eye } from "lucide-react";
import { useState } from "react";
// import RejectionModal from "./RejectionModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import RejectionModal from "../../../components/Modal/RejectionModal";

const ActivityLog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedMessage, setSelectedMessage] = useState("");

  const { data: statuses = [] } = useQuery({
    queryKey: ["appliedStatus", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applied-trainers/status/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(statuses);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trainer Application Activity</h2>
      <div className="space-y-4">
        {statuses.map((item, idx) => (
          <div
            key={idx}
            className="border p-4 rounded-md bg-white shadow flex items-center justify-between"
          >
            <div>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    item.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Applied At:</span>{" "}
                {new Date(item.appliedAt).toLocaleDateString()}
              </p>
            </div>

            {item.status === "rejected" && (
              <button
                onClick={() => setSelectedMessage(item.feedback)}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Eye size={20} />
                View Feedback
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      <RejectionModal
        message={selectedMessage}
        setMessage={setSelectedMessage}
      />
    </div>
  );
};

export default ActivityLog;
