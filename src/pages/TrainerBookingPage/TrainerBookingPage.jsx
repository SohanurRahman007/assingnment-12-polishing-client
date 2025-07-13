import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";

const packages = [
  {
    title: "basic",
    label: "Basic Membership",
    price: 10,
    duration: "One Time",
    features: [
      "Access to gym facilities during regular operating hours.",
      "Use of cardio and strength training equipment.",
    ],
  },
  {
    title: "standard",
    label: "Standard Membership",
    price: 50,
    duration: "Monthly",
    features: [
      "All Basic Membership benefits.",
      "Access to group fitness classes (yoga, spinning, Zumba).",
      "Access to locker rooms and showers.",
    ],
  },
  {
    title: "premium",
    label: "Premium Membership",
    price: 100,
    duration: "Lifetime",
    features: [
      "All Standard Membership benefits.",
      "Access to personal training sessions with certified trainers.",
      "Use of sauna or steam room.",
      "Discounts on massage therapy or nutrition counseling.",
    ],
  },
];

const TrainerBookingPage = () => {
  const { id, slot } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: trainer, isLoading } = useQuery({
    queryKey: ["confirmedTrainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/confirmed-trainers/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <Helmet>
        <title>Book a Session | FitSphere</title>
      </Helmet>

      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
        Session with <span className="text-lime-600">{trainer.name}</span>
      </h1>

      <p className="max-w-xl mx-auto mt-2 text-center text-gray-600">
        Selected Slot: <strong>{slot}</strong>. Choose a membership plan to
        continue your journey with expert guidance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="flex flex-col w-full p-4 space-y-2 text-center bg-white border-2 border-gray-200 rounded-lg shadow-md"
          >
            {/* Title */}
            <h2 className="inline-flex items-center justify-center px-3 py-1 font-semibold tracking-tight text-lime-600 uppercase bg-lime-50 rounded-full">
              {pkg.label}
            </h2>

            {/* Price */}
            <div>
              <span className="pt-2 text-3xl font-bold text-gray-800 uppercase">
                ${pkg.price}
              </span>
              <span className="block text-sm text-gray-500">
                {pkg.duration}
              </span>
            </div>

            {/* Features */}
            <ul className="flex-1 space-y-3 text-gray-600 text-sm text-left">
              {pkg.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>

            {/* Join Now Button with dynamic query */}
            <Link
              to={`/payment?trainer=${trainer._id}&slot=${slot}&package=${pkg.title}&price=${pkg.price}`}
              className="block text-center w-full mt-6 px-4 py-2 text-white font-medium uppercase rounded-lg transition duration-300 bg-lime-500 hover:bg-lime-600"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TrainerBookingPage;
