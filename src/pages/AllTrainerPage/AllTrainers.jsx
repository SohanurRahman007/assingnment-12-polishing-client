import { useQuery } from "@tanstack/react-query";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SkeletonAllTrainers from "../../components/SkeletonLoader/SkeletonAllTrainers";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["confirmedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/confirmed-trainers");
      return res.data;
    },
  });

  if (isLoading) return <SkeletonAllTrainers />;

  return (
    <Container>
      <Helmet>
        <title>All Trainers | FitSphere</title>
      </Helmet>
      {/* Animated Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center"
      >
        <span className="text-gray-800">Meet Our</span>
        Professional Trainers
      </motion.h2>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-6"
      >
        Explore our diverse range of certified trainers, each bringing their
        unique expertise to help you reach your fitness goals. Whether you're
        into yoga, strength training, or dance workouts — we have the right
        coach for you!
      </motion.p>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </section>
    </Container>
  );
};

export default AllTrainers;
