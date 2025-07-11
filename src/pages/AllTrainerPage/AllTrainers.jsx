import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllTrainers = () => {
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/trainers`);
      return res.data;
    },
  });

  console.log(trainers);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {trainers.map((trainer) => (
        <div key={trainer._id} className="p-4 border rounded shadow bg-white">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="mt-2 text-xl font-bold">{trainer.name}</h2>
          <p>Experience: {trainer.experience}</p>
          <p>Skills: {trainer.skills.join(", ")}</p>
          <p>Slots: {trainer.availableSlots.length}</p>
          <div className="flex gap-2 mt-2">
            {trainer.socialLinks?.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                Social {i + 1}
              </a>
            ))}
          </div>
          <Link
            to={`/trainer/${trainer._id}`}
            className="mt-4 inline-block bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700"
          >
            Know More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllTrainers;
