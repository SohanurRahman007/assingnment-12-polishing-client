import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../Shared/Container";

const FeaturedClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["featured-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes-with-booking");
      return res.data.slice(0, 6); // top 6 most booked
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <section className="mt-10">
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center"
          >
            Featured <span className="text-gray-800">Classes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-gray-600 max-w-2xl mx-auto"
          >
            Discover our top-rated fitness classes — trusted by hundreds,
            designed to energize, and built to transform your body and mind.
            Your fitness journey starts here!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => (
            <motion.div
              key={cls._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-lime-600 transition">
                  {cls.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {cls.details}
                </p>
                <p className="text-sm font-semibold text-lime-600">
                  Total Bookings: {cls.bookingCount || 0}
                </p>
                <Link
                  to="/classes"
                  className="text-sm text-lime-600 hover:underline mt-2"
                >
                  View All Classes →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default FeaturedClasses;
