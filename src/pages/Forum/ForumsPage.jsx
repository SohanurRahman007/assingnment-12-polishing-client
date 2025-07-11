import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Badge from "../../components/Badge/Badge";
// import Badge from "../../components/Badge";

const ForumsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data = {}, refetch } = useQuery({
    queryKey: ["forums", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const handleVote = async (id, type) => {
    if (!user) return toast.error("You must be logged in to vote.");
    try {
      const res = await axiosSecure.patch(`/forums/vote/${id}`, {
        email: user.email,
        type,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Vote submitted");
        refetch();
      } else {
        toast("You already voted");
      }
    } catch {
      toast.error("Vote failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-center text-lime-600 mb-8">
        Community Forums
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.forums?.map((forum) => (
          <div key={forum._id} className="p-5 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{forum.title}</h2>
              <Badge role={forum.userRole} />
            </div>
            <p className="text-sm text-gray-600 mb-3">{forum.content}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>
                By:{" "}
                <span className="font-medium text-gray-700">
                  {forum.author}
                </span>
              </p>
              <p>{new Date(forum.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => handleVote(forum._id, "upvote")}
                className="flex items-center gap-1 text-green-600 hover:text-green-700"
              >
                <FaThumbsUp /> {forum.upvotes}
              </button>
              <button
                onClick={() => handleVote(forum._id, "downvote")}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <FaThumbsDown /> {forum.downvotes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-lime-200 rounded hover:bg-lime-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.forums?.length < limit}
          className="px-3 py-1 bg-lime-200 rounded hover:bg-lime-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ForumsPage;
