import { Link } from "react-router-dom";
import { RiUserStarLine, RiFileList3Line } from "react-icons/ri";

const MemberMenu = () => {
  return (
    <>
      <Link
        to="/dashboard/booked-trainers"
        className="flex items-center px-3 py-2 rounded-md hover:bg-lime-100"
      >
        <RiUserStarLine className="mr-3 text-lg text-lime-600" />
        Booked Trainers
      </Link>
      <Link
        to="/dashboard/activity-log"
        className="flex items-center px-3 py-2 rounded-md hover:bg-lime-100"
      >
        <RiFileList3Line className="mr-3 text-lg text-lime-600" />
        Activity Log
      </Link>
    </>
  );
};

export default MemberMenu;
