import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ForumCard from "../../components/ForumCard/ForumCard";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
// import ForumCard from "../../components/Forum/ForumCard";

const ForumsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["forums", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forums?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
    <Container>
      <div className="mt-10">
        <Helmet>
          <title>Community Forums | FitSphere</title>
        </Helmet>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center">
          <span className="text-gray-800">Community</span> Forums
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Welcome to the FitSphere Community Forums — a space where trainers and
          admins share insights, tips, and updates related to fitness, wellness,
          and motivation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.forums?.map((forum) => (
            <ForumCard key={forum._id} forum={forum} handleVote={handleVote} />
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
            disabled={data?.forums?.length < limit}
            className="px-3 py-1 bg-lime-200 rounded hover:bg-lime-300 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ForumsPage;
