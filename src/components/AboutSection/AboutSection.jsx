import { motion } from "framer-motion";
import Container from "../Shared/Container";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative bg-center bg-no-repeat bg-cover py-20 mt-20 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/qF5m4zr7/omar-lopez-rincon-BE181-Raj-rg-unsplash.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-md w-full h-64 sm:h-80 md:h-full max-w-full"
          >
            <img
              src="https://i.ibb.co/qF5m4zr7/omar-lopez-rincon-BE181-Raj-rg-unsplash.jpg"
              alt="About FitSphere"
              className="w-full h-full object-cover block"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left flex flex-col justify-center px-2 sm:px-4"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-lime-400 mb-4">
              About <span className="text-white">FitSphere</span>
            </h2>
            <p className="text-gray-100 mb-4 leading-relaxed">
              FitSphere is a revolutionary fitness platform designed to connect
              individuals with expert trainers, dynamic classes, and customized
              workout programs.
            </p>
            <p className="text-gray-300">
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
