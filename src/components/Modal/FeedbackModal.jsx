import { motion, AnimatePresence } from "framer-motion";

const FeedbackModal = ({ isOpen, onClose, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h2 className="text-lg font-semibold text-red-500 mb-3">
              Admin Feedback
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-4">
              {message || "No feedback provided."}
            </p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
