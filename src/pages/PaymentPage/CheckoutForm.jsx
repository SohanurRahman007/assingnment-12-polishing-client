// src/components/CheckoutForm.jsx (or src/pages/PaymentPage.jsx if it's the main page)
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom"; // ⭐ IMPORT useSearchParams ⭐

// Removed props for trainer, slot, pack, price, classId as they come from URL
const CheckoutForm = ({ user }) => {
  // 'user' might come from parent's context
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");
  const [searchParams] = useSearchParams(); // ⭐ Get URL search params here ⭐

  // ⭐ Extract all booking details from URL search parameters ⭐
  const trainerIdFromUrl = searchParams.get("trainerId");
  // const trainerNameFromUrl = searchParams.get("trainerName"); // If you pass it directly
  const slotFromUrl = searchParams.get("slot");
  const packFromUrl = searchParams.get("package"); // Assuming 'package' in URL
  const priceFromUrl = parseFloat(searchParams.get("price")); // Convert price string to number
  const classIdFromUrl = searchParams.get("classId"); // ⭐ CRITICAL: Get classId ⭐

  // --- Debugging logs for CheckoutForm ---
  console.log("CheckoutForm: Booking details from URL ->", {
    trainerIdFromUrl,
    slotFromUrl,
    packFromUrl,
    priceFromUrl,
    classIdFromUrl,
  });
  // ---

  useEffect(() => {
    // Ensure price is valid and greater than 0 for payment intent
    if (priceFromUrl && priceFromUrl > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: priceFromUrl })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          toast.error("Failed to set up payment. Please try again.");
        });
    } else {
      console.warn(
        "Price is invalid or zero, skipping payment intent creation."
      );
      toast.error("Invalid price for payment.");
    }
  }, [priceFromUrl, axiosSecure]); // Depend on priceFromUrl

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("Card details are not properly entered.");
      return;
    }

    // Basic validation for critical booking info
    if (
      !trainerIdFromUrl ||
      !slotFromUrl ||
      !packFromUrl ||
      !priceFromUrl ||
      !classIdFromUrl
    ) {
      toast.error(
        "Missing essential booking details. Please go back and try again."
      );
      return;
    }

    toast.loading("Processing payment...");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.dismiss();
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email, // Use optional chaining for user
            name: user?.displayName,
          },
        },
      });

    toast.dismiss();

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        trainerId: trainerIdFromUrl,
        // trainerName: trainerNameFromUrl, // Include if you pass it
        slot: slotFromUrl,
        pack: packFromUrl,
        price: priceFromUrl,
        email: user?.email,
        name: user?.displayName,
        paidAt: new Date(),
        classId: classIdFromUrl, // ⭐ Now correctly included from URL ⭐
        transactionId: paymentIntent.id,
      };

      try {
        await axiosSecure.post("/save-payment", paymentInfo);
        toast.success("Payment successful and recorded!");
        // ⭐ Important: Clear cart, redirect user, or show success message ⭐
        // Example: navigate('/payment-success');
      } catch (saveError) {
        console.error("Error saving payment info to backend:", saveError);
        toast.error(
          "Payment successful, but failed to record in database. Contact support."
        );
      }
    } else {
      toast.error(`Payment failed: ${paymentIntent.status}.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded border-lime-400" />
      <button
        type="submit"
        disabled={!stripe || !elements || !clientSecret || priceFromUrl <= 0}
        className="px-4 py-2 bg-lime-600 text-white rounded disabled:opacity-50"
      >
        Pay ${priceFromUrl?.toFixed(2) || "0.00"}
      </button>
    </form>
  );
};

export default CheckoutForm;
