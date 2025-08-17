import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const RejectionModal = ({
  isOpen,
  onClose,
  onSubmit,
  feedback,
  setFeedback,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Blurred Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
              {/* Title */}
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold text-red-600 mb-4"
              >
                Reject Trainer Application
              </Dialog.Title>

              {/* Feedback Textarea */}
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded p-3 text-sm focus:border-lime-500 focus:ring-1 focus:ring-lime-400 mb-4"
                placeholder="Enter rejection feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 cursor-pointer text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  disabled={!feedback.trim()}
                  className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
                >
                  Submit Reject
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RejectionModal;
