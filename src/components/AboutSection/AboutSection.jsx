import { motion } from "framer-motion";
import Container from "../Shared/Container";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative bg-fixed bg-center bg-no-repeat bg-cover min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/qF5m4zr7/omar-lopez-rincon-BE181-Raj-rg-unsplash.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Floating Content */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 items-center rounded-xl   py-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-md"
          >
            <img
              src="https://i.ibb.co/qF5m4zr7/omar-lopez-rincon-BE181-Raj-rg-unsplash.jpg"
              alt="About FitSphere"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-lime-600 mb-4">
              About FitSphere
            </h2>
            <p className="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
              FitSphere is a revolutionary fitness platform designed to connect
              individuals with expert trainers, dynamic classes, and customized
              workout programs.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you're a beginner or a pro, our mission is to create a
              supportive and smart fitness space — from real-time tracking to
              live coaching and flexible schedules, we empower your fitness
              journey every step of the way.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;
