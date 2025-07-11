import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["applied-trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applied-trainers");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (trainers.length === 0)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        No trainer applications found.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-lime-600 mb-6">
        Trainer Applications
      </h2>

      <div className="space-y-6">
        {trainers.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-md shadow-sm p-6 border border-gray-300 dark:border-gray-700"
          >
            <div className="grid grid-cols-4 gap-6">
              {/* Left info column */}
              <div className="col-span-full lg:col-span-1 flex flex-col items-center">
                <img
                  src={t.profileImage || "/default-avatar.png"}
                  alt={t.name}
                  className="w-24 h-24 rounded-full border border-lime-600 object-cover mb-4"
                />
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {t.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Status:{" "}
                  <span className="capitalize font-medium text-lime-600">
                    {t.status}
                  </span>
                </p>
              </div>

              {/* Right details column */}
              <div className="col-span-full lg:col-span-3">
                <p>
                  <strong>Skills:</strong> {(t.skills || []).join(", ")}
                </p>
                <p>
                  <strong>Available Days:</strong>{" "}
                  {(t.availableDays || []).join(", ")}
                </p>
                <p>
                  <strong>Available Time:</strong> {t.availableTime || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {t.email}
                </p>

                <div className="mt-4 text-right">
                  <Link
                    to={`/dashboard/applied-trainer-details/${t._id}`}
                    className="inline-block bg-lime-600 hover:bg-lime-700 text-white font-semibold px-4 py-2 rounded-md transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTrainers;
