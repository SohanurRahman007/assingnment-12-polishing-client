import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/images/logo-flat.png";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 mt-8 pt-10 pb-6">
      <Container>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-3">
                <img src={logo} alt="logo" className="w-10 h-8" />
                <span className="text-xl font-semibold text-lime-500">
                  Fit<span className="text-white">Sphere</span>
                </span>
              </Link>
              <p className="text-sm">
                Your all-in-one fitness platform connecting trainers, classes,
                and members to transform your wellness journey.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-lime-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/classes"
                    className="hover:text-lime-400 transition"
                  >
                    All Classes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trainers"
                    className="hover:text-lime-400 transition"
                  >
                    Trainers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="hover:text-lime-400 transition"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/faq" className="hover:text-lime-400 transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-lime-400 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-lime-400 transition"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
              <p className="text-sm">Email: support@fitsphere.com</p>
              <p className="text-sm mb-4">Phone: +880-1234-567890</p>
              <div className="flex gap-3 text-lg text-white">
                <a href="#" className="hover:text-lime-400">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-lime-400">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-lime-400">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-lime-400">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FitSphere. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
