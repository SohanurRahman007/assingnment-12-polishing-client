import { Link } from "react-router-dom";
import { MdOutlineEventAvailable, MdAddToPhotos } from "react-icons/md";

const TrainerMenu = () => {
  return (
    <>
      <Link
        to="/dashboard/add-slot"
        className="flex items-center px-3 py-2 rounded-md hover:bg-lime-100"
      >
        <MdAddToPhotos className="mr-3 text-lg text-lime-600" />
        Add Slot
      </Link>
      <Link
        to="/dashboard/manage-slots"
        className="flex items-center px-3 py-2 rounded-md hover:bg-lime-100"
      >
        <MdOutlineEventAvailable className="mr-3 text-lg text-lime-600" />
        Manage Slots
      </Link>
    </>
  );
};

export default TrainerMenu;
