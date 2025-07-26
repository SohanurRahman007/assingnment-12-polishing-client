import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import ForumModal from "../Modal/ForumModal";
import Container from "../Shared/Container";
import { Link } from "react-router";
import { motion } from "framer-motion";

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
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center"
        >
          Latest <span className="text-gray-800">Community Posts</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-600 max-w-2xl mx-auto mb-6"
        >
          Discover the latest tips and topics from our fitness community. Join
          the conversation, stay inspired, and keep moving!
        </motion.p>

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
