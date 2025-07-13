import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const PaymentPage = () => {
  const [params] = useSearchParams();
  const trainerId = params.get("trainer");
  const slot = params.get("slot");
  const pack = params.get("package");
  const price = parseFloat(params.get("price")) || 0;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainerPayment", trainerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/confirmed-trainers/${trainerId}`);
      return res.data;
    },
    enabled: !!trainerId,
  });

  if (isLoading) {
    return (
      <p className="text-center py-10 font-semibold">
        Loading payment details...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto ">
      <Helmet>
        <title>Payment | FitSphere</title>
      </Helmet>

      <div className="bg-gray-50  rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-2xl font-bold text-lime-600 text-center ">
          Complete Your Payment
        </h2>
        <p className="text-center max-w-xl mx-auto text-gray-600 mt-2 mb-6">
          Review your selected package and complete your secure payment to
          confirm your session with the trainer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Trainer Info */}
          <div className="space-y-2 text-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-lime-400 pb-1">
              Trainer Info
            </h4>
            <p>
              <strong>Name:</strong> {trainer.name}
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
          <div className="space-y-2 text-gray-700">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-1 border-lime-400">
              Your Info
            </h4>
            <p>
              <strong>Name:</strong> {user?.displayName}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="border-t border-lime-400 pt-4">
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
  );
};

export default PaymentPage;
