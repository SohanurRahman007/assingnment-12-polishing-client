import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ trainer, slot, pack, price, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (price) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      return_url: window.location.href,
    });

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        trainerId: trainer._id,
        trainerName: trainer.name,
        slot,
        pack,
        price,
        email: user.email,
        name: user.displayName,
        paidAt: new Date(),
      };

      await axiosSecure.post("/save-payment", paymentInfo);
      toast.success("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded border-lime-400" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="px-4 py-2 bg-lime-600  text-white rounded disabled:opacity-50"
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
