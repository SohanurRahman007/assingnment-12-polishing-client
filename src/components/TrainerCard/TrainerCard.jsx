import { Link } from "react-router-dom";
import { Briefcase, Facebook, Linkedin } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TrainerCard = ({ trainer }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="flex flex-col h-full  bg-white shadow-md rounded-lg overflow-hidden group"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          className="w-full h-40 object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={trainer.profileImage || "https://via.placeholder.com/300x200"}
          alt={trainer.name}
        />
      </div>

      {/* Badge */}
      <div className="flex items-center px-6 py-1 bg-lime-500">
        <Briefcase className="w-5 h-5 text-white" />
        <h1 className="ml-2 text-lg font-semibold text-white">
          {trainer.skills?.[0] || "Fitness Trainer"}
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-6 py-2">
        <h2 className="text-xl font-bold text-gray-800">{trainer.name}</h2>

        <p className="text-sm text-gray-600 mt-2">
          <span className="font-medium text-gray-700">Expert in:</span>{" "}
          {trainer.skills?.slice(0, 3).join(", ") || "Not specified"}
          <br />
          <span className="font-medium text-gray-700">Available:</span>{" "}
          {trainer.availableDays?.join(", ") || "Not specified"}
        </p>

        {/* Social icons */}
        {(trainer.facebook || trainer.linkedin) && (
          <div className="flex items-center gap-3 text-gray-700">
            <span className="text-sm font-semibold">Social:</span>
            {trainer.facebook && (
              <a
                href={trainer.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
                title="Facebook"
              >
                <Facebook size={18} />
              </a>
            )}
            {trainer.linkedin && (
              <a
                href={trainer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-700 transition"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Button */}
        <div className="pt-4">
          <Link
            to={`/trainer/${trainer._id}`}
            className="inline-block w-full text-center px-4 py-2 bg-lime-500 text-white text-sm font-semibold rounded hover:bg-lime-600 transition"
          >
            Know More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
