// pages/TrainerBookingPage.jsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async"; // For setting document title

// Membership packages constant (no changes)
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
  // FIXED: Read both id and slot from route params
  const { id, slot } = useParams();

  const axiosSecure = useAxiosSecure();

  // Fetch trainer details using react-query
  const {
    data: trainer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["confirmedTrainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/confirmed-trainers/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Container>
        <div className="text-center text-red-600 mt-10">
          Error loading trainer details: {error?.message || "Unknown error"}
        </div>
      </Container>
    );
  }

  if (!trainer) {
    return (
      <Container>
        <div className="text-center text-gray-700 mt-10">
          Trainer not found. Please go back to{" "}
          <Link to="/trainers" className="text-lime-600 underline">
            Trainers page
          </Link>
          .
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <Helmet>
        <title>Book Session | FitSphere</title>
      </Helmet>

      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
        Session with{" "}
        <span className="text-lime-600">{trainer.name || "N/A"}</span>
      </h1>

      <p className="max-w-xl mx-auto mt-2 text-center text-gray-600">
        Selected Slot: <strong>{slot || "Not specified"}</strong>. Choose a
        membership plan to continue your journey with expert guidance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {packages.map((pkg) => (
          <div
            key={pkg.title}
            className="flex flex-col w-full p-6 space-y-4 text-center bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="inline-flex items-center justify-center px-4 py-2 font-semibold tracking-tight text-lime-600 uppercase bg-lime-50 rounded-full text-lg">
              {pkg.label}
            </h2>

            <div>
              <span className="pt-2 text-4xl font-bold text-gray-800 uppercase">
                ${pkg.price}
              </span>
              <span className="block text-sm text-gray-500">
                {pkg.duration}
              </span>
            </div>

            <ul className="flex-1 space-y-3 text-gray-600 text-sm text-left px-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-lime-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to={`/payment?trainerId=${trainer._id}&slot=${slot}&package=${pkg.title}&price=${pkg.price}`}
              className="block text-center w-full mt-6 px-4 py-3 text-white font-medium uppercase rounded-lg transition duration-300 bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-75"
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
