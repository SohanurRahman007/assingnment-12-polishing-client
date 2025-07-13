import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const TrainerBookingPage = () => {
  const { id, slot } = useParams(); // trainer id and slot
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: trainer, isLoading } = useQuery({
    queryKey: ["confirmedTrainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/confirmed-trainers/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleJoin = (packageType, price) => {
    navigate("/payment", {
      state: {
        trainerId: id,
        slot,
        trainerName: trainer.name,
        packageType,
        price,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-lime-600 mb-4">
        Booking for: {trainer.name}
      </h2>
      <p className="mb-2">
        Selected Slot: <strong>{slot}</strong>
      </p>
      <h3 className="text-lg font-semibold mt-4">Select a Package:</h3>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {[
          {
            title: "Basic",
            price: 10,
            features: [
              "Access to gym facilities",
              "Use of cardio & strength equipment",
            ],
          },
          {
            title: "Standard",
            price: 50,
            features: [
              "All Basic benefits",
              "Access to group classes",
              "Locker rooms & showers",
            ],
          },
          {
            title: "Premium",
            price: 100,
            features: [
              "All Standard benefits",
              "Personal training",
              "Sauna, discounts on therapy",
            ],
          },
        ].map((pkg) => (
          <div
            key={pkg.title}
            className="border rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <h4 className="text-xl font-bold text-lime-700">{pkg.title}</h4>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
              {pkg.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-lg font-bold">${pkg.price}</p>
              <button
                onClick={() => handleJoin(pkg.title, pkg.price)}
                className="mt-2 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded w-full"
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerBookingPage;
