import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import ForumModal from "../Modal/ForumModal";
import Container from "../Shared/Container";
import { Link } from "react-router";

const LatestForumsSection = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedForum, setSelectedForum] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: forums = [] } = useQuery({
    queryKey: ["latestForums"],
    queryFn: async () => {
      const res = await axiosSecure.get("/forums/latest");
      return res.data;
    },
  });

  const openModal = (forum) => {
    setSelectedForum(forum);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedForum(null);
  };

  return (
    <Container>
      <section className=" mt-10">
        <h2 className="text-3xl font-bold text-center text-lime-500 ">
          Latest Community Posts
        </h2>
        <p className="text-gray-600 text-center mb-4 text-md mt-1">
          Discover the latest tips and topics from our fitness community. <br />
          Join the conversation, stay inspired, and keep moving!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forums.map((forum) => (
            <div
              key={forum._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {forum.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {forum.content}
              </p>
              <button
                onClick={() => openModal(forum)}
                className="mt-4 text-lime-600 cursor-pointer hover:underline font-medium"
              >
                Read More →
              </button>
            </div>
          ))}
        </div>

        {/* Forum Modal */}
        <ForumModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          forum={selectedForum}
        />

        <Link
          to="/forum"
          className="text-lime-600 flex items-center justify-center mt-4 hover:underline font-medium"
        >
          View All
        </Link>
      </section>
    </Container>
  );
};

export default LatestForumsSection;
