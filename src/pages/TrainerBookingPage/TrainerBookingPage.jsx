import { useParams, useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
// Assuming you'll pass selectedPackage to CheckoutForm or handle selection here
// You'll need to import your CheckoutForm and Stripe Elements setup if you render it directly
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "../../components/CheckoutForm"; // Adjust path as needed

// Load Stripe Promise outside of component render if you're rendering CheckoutForm directly
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const packages = [
  {
    title: "basic",
    label: "Basic Membership",
    price: 10,
    duration: "One Time",
    features: [
      "Access to gym facilities.",
      "Use of equipment.",
      "Basic workout plans.",
    ],
  },
  {
    title: "standard",
    label: "Standard Membership",
    price: 50,
    duration: "Monthly",
    features: [
      "All Basic benefits.",
      "Group fitness classes.",
      "Locker rooms.",
      "Monthly progress tracking.",
    ],
  },
  {
    title: "premium",
    label: "Premium Membership",
    price: 100,
    duration: "Lifetime",
    features: [
      "All Standard benefits.",
      "Personal training sessions.",
      "Sauna/steam room.",
      "Discounts on therapy.",
      "Personalized diet plans.",
    ],
  },
];

const TrainerBookingPage = () => {
  const { id: trainerId, slot } = useParams();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");

  const axiosSecure = useAxiosSecure();

  // --- Debugging Logs for initial URL params ---
  console.log(
    "TrainerBookingPage (Initial Render): Current URL parameters -> trainerId:",
    trainerId,
    "slot:",
    slot,
    "classId (from URL):",
    classId // ⭐ CHECK THIS LOG'S OUTPUT CAREFULLY ⭐
  );

  // Fetch trainer data (your existing code)
  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
    error: trainerError,
  } = useQuery({
    queryKey: ["confirmedTrainer", trainerId],
    queryFn: () =>
      axiosSecure
        .get(`/confirmed-trainers/${trainerId}`)
        .then((res) => res.data),
    enabled: !!trainerId,
  });

  // New: Fetch class data
  const {
    data: classData,
    isLoading: isClassLoading,
    isError: isClassError,
    error: classError,
  } = useQuery({
    queryKey: ["classDetails", classId],
    queryFn: () =>
      axiosSecure.get(`/classes/${classId}`).then((res) => res.data),
    enabled: !!classId, // Only fetch if classId exists
  });

  // Loading states
  if (isTrainerLoading || isClassLoading) return <LoadingSpinner />;

  // Handle class fetch error with specific 404 message
  if (isClassError) {
    if (classError.response?.status === 404) {
      return (
        <Container>
          <div className="text-center text-red-600 mt-10">
            Class not found for ID: {classId}. Please check the link or select a
            valid class.
          </div>
        </Container>
      );
    }
    return (
      <Container>
        <div className="text-center text-red-600 mt-10">
          Error fetching class data: {classError.message}
        </div>
      </Container>
    );
  }

  // Handle trainer fetch error (your existing code)
  if (isTrainerError) {
    return (
      <Container>
        <div className="text-center text-red-600 mt-10">
          Error loading trainer details:{" "}
          {trainerError?.message || "Unknown error"}
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
        Book Session with{" "}
        <span className="text-lime-600">{trainer.name || "N/A"}</span>
      </h1>

      <p className="max-w-xl mx-auto mt-2 text-center text-gray-600">
        You are booking for the{" "}
        <strong className="text-lime-700">
          {/* Display class name if available, otherwise a generic message */}
          {classData
            ? classData.name
            : "Selected Class (Details Not Available)"}
        </strong>{" "}
        class.
        <br />
        Selected Slot: <strong>{slot || "Not specified"}</strong>. Choose a
        membership plan to continue your journey with expert guidance.
      </p>

      {/* Render Class Details section ONLY if classData is successfully fetched */}
      {classData && (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Class Details
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {classData.image && (
              <img
                src={classData.image}
                alt={classData.name}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div>
              <p className="text-gray-700 font-medium">{classData.name}</p>
              <p className="text-gray-600 text-sm line-clamp-2">
                {classData.details}
              </p>
            </div>
          </div>
        </div>
      )}

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
              // ⭐ CRITICAL: Ensure classId is passed here ⭐
              // It's already there, but if the 'classId' variable itself is "null", it will pass "null"
              to={`/payment?trainerId=${trainer._id}&slot=${slot}&package=${pkg.title}&price=${pkg.price}&classId=${classId}`}
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
