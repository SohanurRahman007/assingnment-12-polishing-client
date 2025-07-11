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

  if (trainers.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No trainer applications found.
      </p>
    );
  }

  return (
    <section className="">
      <form className="container mx-auto space-y-6">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-md bg-gray-100 min-h-7/12">
          {/* Left Sidebar */}
          <div className="space-y-2 bg-white  p-4 col-span-full lg:col-span-1 rounded-md">
            <p className="text-xl md:text-2xl font-semibold text-lime-500">
              Trainer Applications
            </p>
            <p className="text-sm text-gray-500">
              Review all applications and manage them from this panel.
            </p>
          </div>

          {/* Right Table Section */}
          <div className="col-span-full lg:col-span-3 overflow-x-auto">
            <table className="min-w-full text-sm rounded-xl text-gray-800">
              <thead className=" text-gray-700 bg-lime-200">
                <tr>
                  <th className="text-left px-2 py-2">#</th>
                  <th className="text-left px-2 py-2">Name</th>
                  <th className="text-left px-2 py-2">Skills</th>
                  <th className="text-left px-2 py-2">Available Days</th>
                  <th className="text-left px-2 py-2">Status</th>
                  <th className="text-left px-2 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((t, index) => (
                  <tr
                    key={t._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2">{t.name}</td>
                    <td className="px-2 py-2">{(t.skills || []).join(", ")}</td>
                    <td className="px-2 py-2">
                      {(t.availableDays || []).join(", ")}
                    </td>
                    <td className="px-2 py-2 capitalize text-lime-600">
                      {t.status}
                    </td>
                    <td className="px-2 py-2">
                      <Link
                        to={`/dashboard/applied-trainer-details/${t._id}`}
                        className="text-sm bg-lime-600 hover:bg-lime-700 text-white px-1 md:px-3 md:py-1 rounded-md"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default AppliedTrainers;
