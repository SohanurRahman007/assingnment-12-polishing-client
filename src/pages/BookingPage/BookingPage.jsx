// pages/BookingPage.jsx
import { useParams, useSearchParams } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  console.log(id);
  const [searchParams] = useSearchParams();
  const slotName = searchParams.get("slot");

  // Here you can fetch trainer again and display details

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Booking for Slot: {slotName}</h2>

      {/* Show Membership Options */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Basic", price: 10 },
          { title: "Standard", price: 50 },
          { title: "Premium", price: 100 },
        ].map((pkg) => (
          <div key={pkg.title} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{pkg.title}</h3>
            <p>Price: ${pkg.price}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
              onClick={() =>
                // Save to state or redirect to payment with slot and package info
                console.log("Join", pkg.title)
              }
            >
              Join Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
