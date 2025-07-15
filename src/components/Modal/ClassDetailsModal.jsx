import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const ClassDetailsModal = ({ isOpen, onClose, selectedClass }) => {
  if (!selectedClass) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* 🔳 Backdrop with blur & transparency */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 backdrop-blur-0"
          enterTo="opacity-100 backdrop-blur-sm"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 backdrop-blur-sm"
          leaveTo="opacity-0 backdrop-blur-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* 🔳 Modal Panel animation */}
        <div className="fixed inset-0 flex items-center justify-center px-4 py-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-10"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-10"
          >
            <Dialog.Panel className="w-full max-w-3xl bg-white rounded-xl p-6 relative overflow-y-auto max-h-[90vh] shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>

              <Dialog.Title className="text-2xl font-bold text-lime-600 mb-4">
                {selectedClass.name}
              </Dialog.Title>

              <img
                src={selectedClass.image}
                alt={selectedClass.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <p className="text-gray-700 mb-2">{selectedClass.details}</p>
              <p className="text-sm text-gray-500 mb-4">
                {selectedClass.extraInfo || "No extra info provided."}
              </p>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Top Trainers:
                </h4>
                <div className="flex flex-wrap gap-4">
                  {selectedClass.trainers?.length > 0 ? (
                    selectedClass.trainers.map((trainer) => (
                      <Link
                        key={trainer._id}
                        to={`/trainer/${trainer._id}`}
                        className="flex items-center gap-3 p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                      >
                        <img
                          src={
                            trainer.profileImage ||
                            "https://i.ibb.co/YD1K9Lg/blank-profile.png"
                          }
                          alt={trainer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-gray-800 font-semibold text-sm">
                          {trainer.name}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-400">No trainers listed.</p>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ClassDetailsModal;
