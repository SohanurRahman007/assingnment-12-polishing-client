import { useState } from "react";
import { motion } from "framer-motion";
// import Container from "../Shared/Container";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
// import { Container } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("your message send to our team");
    // TODO: connect to backend or email API like EmailJS / Nodemailer
  };

  return (
    <Container>
      <Helmet>
        <title>ContactUs | FitSphere</title>
      </Helmet>
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-lime-600 mb-4">
          <span className="text-gray-700">Contact</span> Us
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Have a question, suggestion, or just want to get in touch? We'd love
          to hear from you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-lime-500 mt-1" size={22} />
              <div>
                <h4 className="text-lg font-semibold">Our Location</h4>
                <p className="text-gray-600">
                  123 Fit Street, Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-lime-500 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-gray-600">+880 1234 567 890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-lime-500 mt-1" size={20} />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">support@fitsphere.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-2 space-y-2"
          >
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-lime-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-lime-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-lime-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 rounded-md transition"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
