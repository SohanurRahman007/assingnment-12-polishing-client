import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "How do I track my workout progress on FitSphere?",
    answer:
      "After logging in, go to your dashboard and select 'Activity Log' to view your completed workouts, calories burned, and progress over time.",
  },
  {
    question: "Can I book a personal trainer?",
    answer:
      "Yes! Browse our trainer list, view their profiles, and select 'Book Trainer' to schedule your preferred time slot.",
  },
  {
    question: "How do I become a trainer on FitSphere?",
    answer:
      "Go to the 'Be A Trainer' section from your dashboard, fill out the application form, and our admin team will review your request.",
  },
  {
    question: "Is there a mobile version of FitSphere?",
    answer:
      "Yes, FitSphere is fully responsive and works on all modern smartphones, tablets, and desktops.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Helmet>
        <title>FAQ | FitSphere</title>
      </Helmet>
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-lime-600 mb-10">
          <span className="text-gray-700"> Frequently</span> Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200"
            >
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-100 transition"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-lime-500" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
