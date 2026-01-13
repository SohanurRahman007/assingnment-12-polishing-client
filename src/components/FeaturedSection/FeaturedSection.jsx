import { motion } from "framer-motion";
import { Dumbbell, Clock, Users, CalendarHeart } from "lucide-react";
import Container from "../Shared/Container";

const features = [
  {
    title: "Expert Trainers",
    description:
      "Train with certified professionals specializing in various fitness disciplines to guide you at every step.",
    icon: <Users className="w-8 h-8 text-lime-600" />,
  },
  {
    title: "Flexible Scheduling",
    description:
      "Book training sessions at your convenience with our easy-to-use slot-based scheduling system.",
    icon: <CalendarHeart className="w-8 h-8 text-lime-600" />,
  },
  {
    title: "Real-Time Progress Tracking",
    description:
      "Stay motivated by tracking your workouts, goals, and improvements directly from your dashboard.",
    icon: <Clock className="w-8 h-8 text-lime-600" />,
  },
  {
    title: "Diverse Workout Programs",
    description:
      "Choose from Yoga, Strength Training, CrossFit, and more – suitable for all levels and goals.",
    icon: <Dumbbell className="w-8 h-8 text-lime-600" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      type: "spring",
      stiffness: 80,
    },
  }),
};

const FeaturedSection = () => {
  return (
    <Container>
      <section className="mt-20 " id="features">
        <div className=" text-center">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gray-800"> Why</span> Choose FitSphere?
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Explore our powerful features designed to elevate your fitness
            journey and provide personalized experiences.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow p-6 hover:shadow-lg transition"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FeaturedSection;
