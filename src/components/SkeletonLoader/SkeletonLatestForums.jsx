import { motion } from "framer-motion";

const SkeletonLatestForums = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between animate-pulse"
        >
          {/* Title placeholder */}
          <div className="h-6 bg-gray-300  rounded w-3/4 mb-3"></div>

          {/* Content placeholder */}
          <div className="h-4 bg-gray-200  rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200  rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200  rounded w-5/6"></div>

          {/* Read More button placeholder */}
          <div className="h-4 w-1/3 bg-gray-300  rounded mt-4"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLatestForums;
