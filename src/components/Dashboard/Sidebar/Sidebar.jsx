import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import MenuItem from "./Menu/MenuItem";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-flat.png";

// Updated icons
import { FaUsers, FaChalkboardTeacher, FaUserEdit } from "react-icons/fa";
import { MdOutlineEmail, MdForum } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { BsSpeedometer2 } from "react-icons/bs";
import { RiUserStarLine } from "react-icons/ri";
import { HiOutlineChartBar } from "react-icons/hi";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => setActive(!isActive);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md shadow-md flex justify-between md:hidden px-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className="font-bold text-lime-500">FitSphere</span>
        </Link>
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg hover:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-lg flex flex-col justify-between transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-8" />
            <span className="text-xl font-bold text-lime-500">
              Fit<span className="text-gray-800">Sphere</span>
            </span>
          </Link>
        </div>

        {/* Nav Items */}
        <div className="flex-1 px-4 py-2 overflow-y-auto">
          <nav className="flex flex-col">
            {role === "admin" && (
              <>
                <MenuItem
                  label="Balance & Chart"
                  address="/dashboard/balance"
                  icon={HiOutlineChartBar}
                />
                <MenuItem
                  label="Dashboard"
                  address="/dashboard"
                  icon={BsSpeedometer2}
                />
                <MenuItem
                  label="Manage Users"
                  address="/dashboard/manage-users"
                  icon={FaUsers}
                />
                <MenuItem
                  label="Newsletter"
                  address="/dashboard/newsletter"
                  icon={MdOutlineEmail}
                />
                <MenuItem
                  label="Add Class"
                  address="/dashboard/add-class"
                  icon={GiWeightLiftingUp}
                />
                <MenuItem
                  label="Add Forum"
                  address="/dashboard/add-forum"
                  icon={MdForum}
                />
                <MenuItem
                  label="Applied Trainers"
                  address="/dashboard/applied-trainers"
                  icon={RiUserStarLine}
                />
              </>
            )}

            {role === "trainer" && (
              <>
                <MenuItem
                  label="Manage Slots"
                  address="/dashboard/manage-slots"
                  icon={FaChalkboardTeacher}
                />
                <MenuItem
                  label="Add Slot"
                  address="/dashboard/add-slot"
                  icon={GiWeightLiftingUp}
                />
                <MenuItem
                  label="Add Forum"
                  address="/dashboard/add-forum"
                  icon={MdForum}
                />
              </>
            )}

            {role === "member" && (
              <>
                <MenuItem
                  label="My Trainers"
                  address="/dashboard/booked-trainer"
                  icon={FaUserEdit}
                />
                <MenuItem
                  label="Activity Log"
                  address="/dashboard/activity-log"
                  icon={BsSpeedometer2}
                />
                <MenuItem
                  label="Profile"
                  address="/dashboard/profile"
                  icon={FcSettings}
                />
              </>
            )}
          </nav>
        </div>

        {/* Logout */}
        <div className="px-4 py-3 border-t border-gray-200">
          <button
            onClick={logOut}
            className="flex items-center gap-3 px-4 py-2 w-full text-gray-600 hover:bg-red-100 cursor-pointer hover:text-red-600 rounded-lg transition"
          >
            <GrLogout /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
