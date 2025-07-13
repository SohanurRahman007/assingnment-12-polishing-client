import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrainerDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: trainer = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/confirmed-trainers/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center text-lg font-medium">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Trainer not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Trainer Info */}
        <div>
          <img
            src={trainer.profileImage}
            alt={trainer.name}
            className="w-full h-[400px] object-cover rounded-xl"
          />
          <h2 className="text-3xl font-bold mt-4">{trainer.name}</h2>
          <p className="mt-2 text-gray-700">Age: {trainer.age}</p>
          <p className="text-gray-700">Skills: {trainer.skills?.join(", ")}</p>
          <p className="text-gray-700">
            Available Time: {trainer.availableTime}
          </p>
          <p className="text-gray-700">
            Available Days: {trainer.availableDays?.join(", ")}
          </p>

          {/* Social Icons (optional) */}
          <div className="mt-4 flex gap-3">
            <a href="#" className="text-blue-600 hover:underline">
              Facebook
            </a>
            <a href="#" className="text-blue-400 hover:underline">
              Twitter
            </a>
          </div>
        </div>

        {/* Slot & CTA */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Available Slots</h3>
          <div className="flex flex-wrap gap-2">
            {trainer.availableDays?.map((day, i) => (
              <Link
                key={i}
                to={`/book-trainer/${trainer._id}/${day}`}
                className="px-4 py-2 bg-lime-600 text-white rounded-md"
              >
                {day}
              </Link>
            ))}
          </div>

          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold mb-3">
              Interested in becoming a Trainer?
            </h3>
            <Link
              to="/become-trainer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md inline-block"
            >
              Become a Trainer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;
