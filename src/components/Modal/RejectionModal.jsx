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
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-red-500 mb-4"
                >
                  Reject Trainer Application
                </Dialog.Title>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 focus:outline-lime-500 rounded p-2 text-sm mb-4"
                  placeholder="Enter rejection feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-lime-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSubmit}
                    disabled={!feedback.trim()}
                    className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                  >
                    Submit Reject
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RejectionModal;
