import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Container from "../Shared/Container";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../components/Shared/Container";

const Newsletter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribers");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading subscribers...</p>;

  return (
    <Container>
      <div className="my-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-lime-600">
          All Newsletter Subscribers
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="bg-lime-100 text-lime-800 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 border">#</th>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{subscriber.name}</td>
                  <td className="py-2 px-4 border">{subscriber.email}</td>
                  <td className="py-2 px-4 border">
                    {new Date(subscriber.subscribedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Newsletter;
