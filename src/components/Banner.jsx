import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Container from "./Shared/Container";

const slides = [
  {
    id: 1,
    title: "Track Your Progress",
    description: "Monitor workouts, goals, and body stats in one place.",
    image: "https://i.ibb.co/xq2xszc7/fit-slider-3.jpg",
  },
  {
    id: 2,
    title: "Stay Motivated",
    description: "Get daily tips and reminders to stay on track.",
    image: "https://i.ibb.co/21CD3r4M/fit-slider-4.jpg",
  },
  {
    id: 3,
    title: "Join the Community",
    description: "Connect with trainers and friends who inspire you.",
    image: "https://i.ibb.co/YFVK7PQM/fit-slider-2.jpg",
  },
  {
    id: 4,
    title: "Set Real Goals",
    description: "Custom goal tracking made simple and powerful.",
    image: "https://i.ibb.co/sp2PvB7m/fit-slider-1.jpg",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div
        className="relative w-full h-[80vh] overflow-hidden rounded-xl shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent transition-all duration-500" />

              {/* Text Content with Motion */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 60,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 text-white"
              >
                <motion.h2
                  className="text-3xl md:text-6xl font-extrabold text-lime-500 drop-shadow-lg"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -40,
                  }}
                  transition={{ delay: 0.2 }}
                >
                  {slides[currentIndex].title}
                </motion.h2>

                <motion.p
                  className="text-md md:text-xl mt-4 max-w-2xl text-gray-200"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -40,
                  }}
                  transition={{ delay: 0.3 }}
                >
                  {slides[currentIndex].description}
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-md transition"
                >
                  Explore Now
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 right-6 flex gap-3 z-10"
            >
              <button
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-lime-500 text-white hover:bg-lime-600 transition"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-lime-500 text-white hover:bg-lime-600 transition"
              >
                <FaArrowRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default Banner;
