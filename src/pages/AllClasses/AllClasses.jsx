// src/pages/AllClasses.jsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ClassCard from "../../components/ClassCard/ClassCard"; // Make sure this component exists
import ClassDetailsModal from "../../components/Modal/ClassDetailsModal"; // Make sure this component exists
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["classes", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const openModal = (cls) => {
    setSelectedClass(cls);
    setIsModalOpen(true);
    // console.log("AllClasses: Opening modal for class:", cls); // Add this for debugging
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  if (isLoading) return <LoadingSpinner />;

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const filteredClasses = data?.classes?.filter((cls) => {
    const lower = search.toLowerCase();
    return (
      cls.name.toLowerCase().includes(lower) ||
      cls.details?.toLowerCase().includes(lower)
    );
  });

  return (
    <Container>
      <Helmet>
        <title>All Class | FitSphere</title>
      </Helmet>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center mt-10"
      >
        <span className="text-gray-800">Explore All</span>
        Fitness Classes
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-6"
      >
        Explore our wide variety of fitness classes at FitSphere, designed for
        every fitness level and goal. From strength training to yoga, browse
        detailed class information, connect with certified trainers, and find
        the perfect session for your journey..
      </motion.p>

      {/* 🔍 Smart Search */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center border rounded-lg shadow-md max-w-md w-full overflow-hidden bg-white focus-within:ring-2 focus-within:ring-lime-400">
          <input
            type="text"
            placeholder="Type to filter classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-sm focus:outline-none"
          />
          <button
            onClick={() => setSearch("")}
            className="text-gray-500 hover:text-red-500 px-4"
            title="Clear search"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 🃏 Cards */}
      {filteredClasses?.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredClasses.map((cls) => (
            <motion.div key={cls._id} variants={cardVariants}>
              {/* This is where ClassCard receives 'cls' */}
              <ClassCard cls={cls} onViewDetails={() => openModal(cls)} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No classes matched your search.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {[...Array(totalPages).keys()].map((pg) => (
            <motion.button
              key={pg}
              onClick={() => setPage(pg + 1)}
              className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors duration-200 ${
                page === pg + 1
                  ? "bg-lime-500 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-lime-100"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {pg + 1}
            </motion.button>
          ))}
        </div>
      )}

      {/* Modal */}
      <ClassDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedClass={selectedClass}
      />
    </Container>
  );
};

export default AllClasses;
