import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Container from "./Shared/Container";

const slides = [
  {
    id: 1,
    title: "Track Your Progress",
    description: "Monitor workouts, goals, and body stats in one place.",
    image: "https://i.ibb.co/35VKtbyS/fit-slider-6.jpg",
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
    image: "https://i.ibb.co/KpV1tv7b/fit-slider-5.webp",
  },
];

const typingTexts = ["FitSphere", "Your Fitness Journey", "Strong Body & Mind"];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = typingTexts[typedIndex];
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setTypedIndex((prev) => (prev + 1) % typingTexts.length);
        }, 1500);
      }
    }, 120);
    return () => clearTimeout(timeout);
  }, [charIndex, typedIndex]);

  return (
    <Container>
      <div className="relative w-full h-[80vh] overflow-hidden rounded-xl shadow-xl ">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[currentIndex].id}
            src={slides[currentIndex].image}
            alt="Slide Image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* TEXT SECTION */}
        <div className="relative  h-full flex flex-col justify-center items-start px-6 md:px-20 text-white bg-black/40">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-xl"
          >
            Welcome to <span className="text-lime-400">{displayedText}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-4 max-w-2xl text-base md:text-xl text-gray-200"
          >
            {slides[currentIndex].description}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/classes")}
            className="mt-6 px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-lg shadow-md transition"
          >
            Explore Now
          </motion.button>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
