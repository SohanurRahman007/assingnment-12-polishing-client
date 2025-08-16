import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Badge from "../Badge/Badge";

const ForumCard = ({ forum, handleVote }) => {
  return (
    <motion.div
      className="max-w-2xl px-8 py-6   text-gray-800 dark:text-gray-200 rounded-xl shadow-md border border-lime-200 mx-auto w-full flex flex-col justify-between hover:shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Top Section: Date & Badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 ">
          {new Date(forum.createdAt).toLocaleDateString()}
        </span>
        <Badge role={forum.userRole} />
      </div>

      {/* Title & Content */}
      <div className="mt-3">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{forum.title}</h2>
        <p className="text-gray-600  line-clamp-4">{forum.content}</p>
      </div>

      {/* Footer: Author & Votes */}
      <div className="flex items-center justify-between mt-6">
        {/* Author Info */}
        <div className="flex items-center">
          <img
            className="hidden sm:block object-cover w-10 h-10 mr-3 rounded-full border border-lime-500 shadow"
            src={forum.userPhoto || "https://i.ibb.co/x2YtqjS/default-user.png"}
            alt={forum.userName}
          />
          <span className="font-semibold text-gray-600">{forum.userName}</span>
        </div>

        {/* Voting */}
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote(forum._id, "upvote")}
            className="flex items-center gap-1 text-lime-600 hover:text-lime-700 font-medium cursor-pointer"
          >
            <FaThumbsUp /> {forum.upvotes}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote(forum._id, "downvote")}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium cursor-pointer"
          >
            <FaThumbsDown /> {forum.downvotes}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ForumCard;
