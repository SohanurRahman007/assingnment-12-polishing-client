// SkeletonFeaturedClasses.jsx
import { motion } from "framer-motion";

const SkeletonFeaturedClasses = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
        >
          {/* Image placeholder */}
          <div className="h-56 bg-gray-200" />

          {/* Text placeholder */}
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 w-3/4 bg-gray-300  rounded"></div>
            <div className="h-4 w-full bg-gray-200  rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200  rounded"></div>
            <div className="h-5 w-1/2 bg-gray-300  rounded mt-2"></div>
            <div className="h-4 w-1/3 bg-gray-200  rounded"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonFeaturedClasses;
