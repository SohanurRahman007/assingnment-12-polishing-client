// src/pages/AllClasses.jsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classes", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?page=${page}`);
      return res.data;
    },
  });

  console.log(data);

  const totalPages = Math.ceil((data.total || 0) / limit);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading classes</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Fitness Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.classes?.map((cls) => (
          <div
            key={cls._id}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">{cls.name}</h3>
            <p className="mb-2">Category: {cls.category}</p>
            <p className="text-sm mb-2">Description: {cls.description}</p>
            <div className="flex items-center gap-2 flex-wrap mt-2">
              {cls.trainers?.map((trainer) => (
                <Link
                  to={`/trainers/${trainer._id}`}
                  key={trainer.email}
                  className="flex items-center gap-2 bg-gray-100 p-1 rounded hover:bg-gray-200"
                >
                  <img
                    src={trainer.photo}
                    alt={trainer.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm">{trainer.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border hover:bg-blue-500 hover:text-white transition-all ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
