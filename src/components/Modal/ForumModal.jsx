import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Badge from "../Badge/Badge";

const ForumModal = ({ isOpen, closeModal, forum }) => {
  if (!forum) return null;

  console.log(forum);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header: Image + Title + Badge */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      forum.userPhoto ||
                      "https://i.ibb.co/x2YtqjS/default-user.png"
                    }
                    alt={forum.userName}
                    className="w-14 h-14 rounded-full border-2 border-lime-500 shadow"
                  />
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold text-gray-800"
                    >
                      {forum.title}
                    </Dialog.Title>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>By {forum.userName}</span> |{" "}
                      <span>
                        {new Date(forum.createdAt).toLocaleDateString()}
                      </span>
                      <Badge role={forum.userRole} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {forum.content}
                  </p>
                </div>

                {/* Votes Section */}
                <div className="mt-6 flex gap-6 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">
                      {forum.upvotes || 0}
                    </span>
                    <span>Upvotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">
                      {forum.downvotes || 0}
                    </span>
                    <span>Downvotes</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700"
                    onClick={closeModal}
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

export default ForumModal;
