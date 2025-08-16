import { motion } from "framer-motion";

const SkeletonTeamSection = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col h-full animate-pulse"
        >
          {/* Image placeholder */}
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-300  mb-4 border-4 border-lime-500"></div>

          {/* Name placeholder */}
          <div className="h-5 w-24 bg-gray-300  mx-auto rounded mb-2"></div>

          {/* Experience placeholder */}
          <div className="h-4 w-32 bg-gray-200  mx-auto rounded mb-3"></div>

          {/* Skills placeholder */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-5 w-12 bg-gray-200  rounded-full"
              ></div>
            ))}
          </div>

          {/* Social icons placeholder */}
          <div className="flex justify-center gap-4 mt-auto text-lg text-gray-300">
            <div className="h-6 w-6 rounded-full bg-gray-200 "></div>
            <div className="h-6 w-6 rounded-full bg-gray-200 "></div>
          </div>

          {/* View profile button placeholder */}
          <div className="h-8 w-24 bg-gray-300  mx-auto mt-4 rounded-lg"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonTeamSection;
