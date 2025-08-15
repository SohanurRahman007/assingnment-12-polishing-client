import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../Shared/Container";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "../Shared/LoadingSpinner";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const TeamSection = () => {
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
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center"
        >
          <span className="text-gray-800">Meet Our </span>
          Expert Trainers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-6"
        >
          Our certified trainers are dedicated to helping you reach your full
          potential — with expert guidance, encouragement, and a plan built just
          for you.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.slice(0, 6).map((trainer, index) => (
            <motion.div
              key={trainer._id}
              custom={index}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center flex flex-col h-full"
            >
              <img
                src={trainer.profileImage}
                alt={trainer.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-lime-500 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {trainer.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Experience: {trainer.experience} years
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {trainer.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-lime-100 text-lime-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-auto text-lime-600 text-lg">
                <a href={trainer.facebook} target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href={trainer.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedinIn />
                </a>
              </div>

              <Link
                to={`/trainer/${trainer._id}`}
                className="mt-4 inline-block bg-lime-500 hover:bg-lime-600 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                View Profile
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Container>
  );
};

export default TeamSection;
