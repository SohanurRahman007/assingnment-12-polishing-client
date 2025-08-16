import { motion } from "framer-motion";

const SkeletonClassCards = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col animate-pulse"
        >
          {/* Image placeholder */}
          <div className="h-48 w-full bg-gray-300 rounded-lg mb-4"></div>

          {/* Title placeholder */}
          <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>

          {/* Details placeholder */}
          <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-3"></div>

          {/* Total Bookings placeholder */}
          <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>

          {/* View Details button placeholder */}
          <div className="h-8 w-28 bg-gray-300 rounded-lg mx-auto mt-auto"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonClassCards;
