import { useQuery } from "@tanstack/react-query";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["confirmedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/confirmed-trainers");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Animated Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 text-center"
      >
        Meet Our <span className="text-lime-600">Professional Trainers</span>
      </motion.h2>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl text-center mx-auto text-gray-600 text-sm md:text-md px-4 leading-relaxed mb-6"
      >
        Explore our diverse range of certified trainers, each bringing their
        unique expertise to help you reach your fitness goals. Whether you're
        into yoga, strength training, or dance workouts — we have the right
        coach for you!
      </motion.p>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  mx-auto">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </section>
    </Container>
  );
};

export default AllTrainers;
