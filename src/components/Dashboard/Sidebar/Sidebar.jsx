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
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
              />
            </Link>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="logo"
                  width="100"
                  className="w-[40px] h-[30px]"
                />
                <span className="text-xl font-bold text-lime-500 hidden md:inline">
                  Fit<span className="text-gray-800">Sphere</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/* Role-Based Menus */}
              {role === "admin" && (
                <>
                  <MenuItem
                    icon={BsSpeedometer2}
                    label="Dashboard"
                    address="/dashboard"
                  />
                  <MenuItem
                    icon={FaUsers}
                    label="Manage Users"
                    address="/dashboard/manage-users"
                  />
                  <MenuItem
                    icon={MdOutlineEmail}
                    label="Newsletter"
                    address="/dashboard/newsletter"
                  />
                  <MenuItem
                    icon={GiWeightLiftingUp}
                    label="Add Class"
                    address="/dashboard/add-class"
                  />
                  <MenuItem
                    icon={MdForum}
                    label="Add Forum"
                    address="/dashboard/add-forum"
                  />
                  <MenuItem
                    icon={RiUserStarLine}
                    label="Applied for Trainer"
                    address="/dashboard/applied-trainers"
                  />
                  <MenuItem
                    icon={HiOutlineChartBar}
                    label="Balance and Chart"
                    address="/dashboard/balance"
                  />
                </>
              )}

              {role === "trainer" && (
                <>
                  <MenuItem
                    icon={FaChalkboardTeacher}
                    label="Manage Slots"
                    address="/dashboard/manage-slots"
                  />
                  <MenuItem
                    icon={GiWeightLiftingUp}
                    label="Add Slot"
                    address="/dashboard/add-slot"
                  />
                  <MenuItem
                    icon={MdForum}
                    label="Add Forum"
                    address="/dashboard/add-forum"
                  />
                </>
              )}

              {role === "member" && (
                <>
                  <MenuItem
                    icon={FaUserEdit}
                    label="My Trainers"
                    address="/dashboard/booked-trainer"
                  />
                  <MenuItem
                    icon={BsSpeedometer2}
                    label="Activity Log"
                    address="/dashboard/activity-log"
                  />
                  <MenuItem
                    icon={FcSettings}
                    label="Profile"
                    address="/dashboard/profile"
                  />
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Logout Button */}
        <div>
          <hr className="text-lime-500" />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
