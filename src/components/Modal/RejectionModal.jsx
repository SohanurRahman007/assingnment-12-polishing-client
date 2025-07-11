import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const RejectionModal = ({ message, setMessage }) => {
  return (
    <Transition appear show={!!message} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setMessage("")}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-2">
                  Admin Feedback
                </Dialog.Title>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {message}
                </p>
                <div className="mt-4 text-right">
                  <button
                    className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700"
                    onClick={() => setMessage("")}
                  >
                    Close
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
