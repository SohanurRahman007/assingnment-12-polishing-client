import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";
import { FaUser } from "react-icons/fa";
import { FiLogOut, FiLayout } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const baseLinkStyle = `relative px-4 py-2 transition-all duration-200 font-medium`;
  const activeClass = `text-lime-500 border-b-2 border-lime-500`;

  const navLinkStyle = ({ isActive }) =>
    `${baseLinkStyle} ${
      isActive ? activeClass : "text-gray-700 hover:text-lime-500"
    }`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed w-full bg-white z-20 shadow-sm">
      <div className="py-2 border-b border-lime-300">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-[40px] h-[30px]" />
              <span className="text-xl font-bold text-lime-500 hidden md:inline">
                Fit<span className="text-gray-800">Sphere</span>
              </span>
            </Link>

            {/* Center Links */}
            <div className="hidden md:flex gap-6 items-center">
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
              <NavLink to="/trainers" className={navLinkStyle}>
                Trainers
              </NavLink>
              <NavLink to="/classes" className={navLinkStyle}>
                Classes
              </NavLink>
              <NavLink to="/forum" className={navLinkStyle}>
                Forum
              </NavLink>
            </div>

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 border border-neutral-200 flex items-center gap-2 rounded-xl cursor-pointer hover:shadow-md hover:shadow-lime-400 transition"
                >
                  <AiOutlineMenu />
                  <img
                    className="rounded-full w-8 h-8 object-cover"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || avatarImg}
                    alt="profile"
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-md w-40 overflow-hidden text-sm z-50">
                  <div className="flex  flex-col">
                    {/* Hidden Links for Mobile */}
                    <div className="flex flex-col md:hidden">
                      <NavLink to="/" className={navLinkStyle}>
                        Home
                      </NavLink>
                      <NavLink to="/trainers" className={navLinkStyle}>
                        Trainers
                      </NavLink>
                      <NavLink to="/classes" className={navLinkStyle}>
                        Classes
                      </NavLink>
                      <NavLink to="/forum" className={navLinkStyle}>
                        Forum
                      </NavLink>
                    </div>
                    {user ? (
                      <>
                        <NavLink to="/dashboard" className={navLinkStyle}>
                          <div className="flex items-center gap-2">
                            <FiLayout />
                            Dashboard
                          </div>
                        </NavLink>
                        <NavLink
                          to="/dashboard/profile"
                          className={navLinkStyle}
                        >
                          <div className="flex items-center gap-2">
                            <FaUser />
                            Profile
                          </div>
                        </NavLink>
                        <button
                          onClick={logOut}
                          className="px-4 py-2 hover:bg-neutral-100 transition font-semibold flex items-center gap-2"
                        >
                          <FiLogOut className="text-gray-600" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink to="/login" className={navLinkStyle}>
                          Login
                        </NavLink>
                        <NavLink to="/signup" className={navLinkStyle}>
                          Sign Up
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
