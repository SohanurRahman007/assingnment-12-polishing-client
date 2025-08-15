import { Link } from "react-router-dom";

const ClassCard = ({ cls, onViewDetails }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
      {/* Image */}
      <div className="relative overflow-hidden h-60">
        <img
          src={cls.image}
          alt={cls.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-4 left-4 bg-lime-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
          {cls.category || "Fitness Class"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        {/* Title - color changes on card hover */}
        <h3 className="text-2xl font-bold text-gray-800 leading-snug group-hover:text-lime-600 transition-colors duration-300">
          {cls.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 min-h-[60px]">
          {cls.details || "No description provided."}
        </p>

        {/* Trainers and Button */}
        <div className="mt-auto flex items-center justify-between pt-3">
          {/* Trainers */}
          <div className="flex gap-2">
            {cls.trainers?.length ? (
              cls.trainers.slice(0, 5).map((trainer) => (
                <Link
                  to={`/trainer/${trainer._id}`}
                  key={trainer._id}
                  title={trainer.name}
                  className="w-10 h-10 rounded-full border-2 border-lime-500 overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src={
                      trainer.profileImage ||
                      "https://i.ibb.co/YD1K9Lg/blank-profile.png"
                    }
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-400">No trainers</p>
            )}
          </div>

          {/* View Details Button */}
          <button
            onClick={onViewDetails}
            className="text-sm font-semibold cursor-pointer text-lime-600 hover:text-lime-700 hover:underline transition"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
