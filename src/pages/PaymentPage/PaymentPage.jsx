import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";

const PaymentPage = () => {
  const [params] = useSearchParams();
  const trainerId = params.get("trainerId");
  const slot = params.get("slot");
  const pack = params.get("package");
  const price = parseFloat(params.get("price")) || 0;

  console.log("Trainer ID from URL:", trainerId);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainerPayment", trainerId],
    queryFn: async () => {
      if (!trainerId) return {};
      const res = await axiosSecure.get(`/confirmed-trainers/${trainerId}`);
      return res.data;
    },
    enabled: !!trainerId,
  });

  console.log("Trainer data from API:", trainer);

  if (!user) return <LoadingSpinner />;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className=" mx-auto ">
        <Helmet>
          <title>Payment | FitSphere</title>
        </Helmet>

        <div className=" rounded-xl shadow-lg ">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center ">
            <span className="text-gray-800">Complete</span> Your Payment
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
            Review your selected package and complete your secure payment to
            confirm your session with the trainer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Trainer Info */}
            <div className="space-y-2 text-gray-700 p-4 md:p-6">
              <h4 className="text-lg font-semibold text-gray-800 border-b border-lime-400 pb-1">
                Trainer Info
              </h4>
              <p>
                <strong>Name:</strong>{" "}
                {trainer.name || "Trainer info not available"}
              </p>
              <p>
                <strong>Slot:</strong> {slot}
              </p>
              <p>
                <strong>Package:</strong> {pack}
              </p>
              <p>
                <strong>Price:</strong> ${price}
              </p>
            </div>

            {/* User Info */}
            <div className="space-y-2 text-gray-700 p-4 md:p-6">
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-1 border-lime-400">
                Your Info
              </h4>
              <p>
                <strong>Name:</strong> {user?.displayName || "No name"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "No email"}
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="border-t border-lime-400 pt-4 p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Payment Method
            </h3>
            <CheckoutForm
              trainer={trainer}
              slot={slot}
              pack={pack}
              price={price}
              user={user}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentPage;
