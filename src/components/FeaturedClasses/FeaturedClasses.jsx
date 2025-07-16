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
      return res.data.slice(0, 6); // top 6
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <section className="mt-8">
        <div className="">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 text-center"
          >
            Featured <span className="text-lime-600">Classes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-center mx-auto text-gray-600 text-sm md:text-md px-4 leading-relaxed mb-6"
          >
            Discover our most popular fitness classes, trusted and booked by
            hundreds of members. These classes offer the best blend of coaching,
            challenge, and community.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((cls) => (
              <motion.div
                key={cls._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={cls.image}
                    alt={cls.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-gray-800 hover:text-lime-600 transition">
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
        </div>
      </section>
    </Container>
  );
};

export default FeaturedClasses;
