import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useRef } from "react";
import Container from "../Shared/Container";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsSection = () => {
  const swiperRef = useRef();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  return (
    <Container>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white mt-10"
      >
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center"
          >
            What <span className="text-gray-800">Our Members Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-6"
          >
            Our members love the results they’re seeing — and they’re not shy
            about sharing! Check out their honest reviews and inspiring success
            stories.
          </motion.p>

          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white border border-gray-300 rounded-full shadow hover:bg-lime-100 transition"
              title="Previous"
            >
              <FaChevronLeft className="text-lime-600" />
            </button>

            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="w-full"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={review._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-xl border border-gray-200 p-10 text-center relative"
                  >
                    <FaQuoteLeft className="text-lime-500 text-4xl absolute left-6 top-6 opacity-10" />
                    <p className="text-gray-700 text-lg italic mb-4">
                      "{review.feedback}"
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-lime-500"
                              : "text-gray-300"
                          }`}
                          fill={i < review.rating ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.036 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.287-3.974z"
                          />
                        </svg>
                      ))}
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center">
                      <img
                        src={review.reviewerPhoto}
                        alt={review.reviewerName}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-lime-500"
                      />
                      <h4 className="mt-4 font-semibold text-gray-800">
                        {review.reviewerName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Trainer: {review.trainerName}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Next Button */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white border border-gray-300 rounded-full shadow hover:bg-lime-100 transition"
              title="Next"
            >
              <FaChevronRight className="text-lime-600" />
            </button>
          </div>
        </div>
      </motion.section>
    </Container>
  );
};

export default TestimonialsSection;
