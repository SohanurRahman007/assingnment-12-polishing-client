import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

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

  if (trainers.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No trainer applications found.
      </p>
    );
  }

  return (
    <section className="mx-auto mt-6 p-6">
      <Helmet>
        <title>Applied Trainers | FitSphere Dashboard</title>
        <meta
          name="description"
          content="Admin dashboard page to view and manage all applied trainers in FitSphere."
        />
      </Helmet>
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-lime-500 mb-2">
          <span className="text-gray-800">Applied</span> Trainers
        </h2>
        <p className="text-gray-600 mb-6">
          Review all trainer applications from this panel.
        </p>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-lime-100 text-lime-900 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 align-middle text-left">#</th>
                <th className="px-4 py-3 align-middle text-left">Name</th>
                <th className="px-4 py-3 align-middle text-left">Skills</th>
                <th className="px-4 py-3 align-middle text-left">
                  Available Days
                </th>
                <th className="px-4 py-3 align-middle text-left">Status</th>
                <th className="px-4 py-3 align-middle text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trainers.map((trainer, index) => (
                <tr
                  key={trainer._id}
                  className="hover:bg-lime-50 transition duration-200"
                >
                  <td className="px-4 py-3 align-middle font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 align-middle">{trainer.name}</td>
                  <td className="px-4 py-3 align-middle">
                    {(trainer.skills || []).join(", ")}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {(trainer.availableDays || []).join(", ")}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        trainer.status === "approved"
                          ? "bg-lime-100 text-lime-600"
                          : trainer.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {trainer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link
                      to={`/dashboard/applied-trainer-details/${trainer._id}`}
                      className="text-sm bg-lime-500 hover:bg-lime-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AppliedTrainers;
