import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce effect to prevent rapid requests
  useState(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on search
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["classes", page, debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes?page=${page}&limit=${limit}&search=${debouncedSearch}`
      );
      return res.data;
    },
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-lime-600">
        Explore All Fitness Classes
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search classes by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-lime-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={cls.image}
              alt={cls.name}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-lime-600">
                {cls.name}
              </h3>
              <p className="text-gray-700 mt-2">{cls.details}</p>
              <p className="text-sm text-gray-500 mt-1">{cls.extraInfo}</p>

              <div className="mt-4">
                <p className="font-medium text-gray-800">Top Trainers:</p>
                <div className="flex gap-3 mt-2">
                  {cls.trainers?.length > 0 ? (
                    cls.trainers.map((trainer) => (
                      <Link
                        key={trainer._id}
                        to={`/trainer/${trainer._id}`}
                        className="w-12 h-12 rounded-full overflow-hidden border-2 border-lime-500 hover:scale-105 transition-transform"
                        title={trainer.name}
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
                    <p className="text-sm text-gray-400">No trainers listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {[...Array(totalPages).keys()].map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg + 1)}
              className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors duration-200 ${
                page === pg + 1
                  ? "bg-lime-500 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-lime-100"
              }`}
            >
              {pg + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClasses;
