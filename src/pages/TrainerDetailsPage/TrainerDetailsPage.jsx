import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrainerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: trainer = {} } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  const handleSlotClick = (slot) => {
    navigate(`/booking/${id}?slot=${slot.name}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={trainer.image} className="w-full md:w-1/2 rounded" />
        <div>
          <h2 className="text-3xl font-bold">{trainer.name}</h2>
          <p>{trainer.bio}</p>
          <p className="mt-2">Experience: {trainer.experience}</p>
          <div className="flex gap-4 mt-4">
            {trainer.social?.facebook && (
              <a href={trainer.social.facebook} target="_blank">
                Facebook
              </a>
            )}
            {trainer.social?.linkedin && (
              <a href={trainer.social.linkedin} target="_blank">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-bold">Available Slots</h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {trainer.slots?.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleSlotClick(slot)}
            className="border px-4 py-2 rounded bg-green-100"
          >
            {slot.name} ({slot.time})
          </button>
        ))}
      </div>

      <div className="mt-10">
        <button
          onClick={() => navigate("/be-a-trainer")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Become a Trainer
        </button>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;
