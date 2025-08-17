import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../components/Shared/Container";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";
const Newsletter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribers");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className=" mx-auto mt-6 p-6">
      <Helmet>
        <title>Newsletter | FitSphere Dashboard</title>
        <meta
          name="description"
          content="Admin dashboard page to manage newsletters in FitSphere."
        />
      </Helmet>
      {/* Title & Description */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-lime-600 text-left">
          <span className="text-gray-800">Newsletter</span> Subscribers
        </h2>
        <p className="text-gray-600 mt-2 text-left max-w-xl">
          View all users who have subscribed to our newsletter. Keep track of
          their details and subscription date.
        </p>
      </div>

      {/* Table */}
      {subscribers.length === 0 ? (
        <p className="text-gray-500 py-10 text-left">
          No subscribers found yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-lime-50 text-lime-800 uppercase text-xs font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((subscriber, index) => (
                <tr
                  key={subscriber._id}
                  className="hover:bg-lime-50 transition duration-150"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {subscriber.name}
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {subscriber.email}
                  </td>
                  <td className="py-2 px-4 text-gray-500 text-sm">
                    {new Date(subscriber.subscribedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
