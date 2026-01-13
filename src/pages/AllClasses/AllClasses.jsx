import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ClassCard from "../../components/ClassCard/ClassCard";
import ClassDetailsModal from "../../components/Modal/ClassDetailsModal";
import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SkeletonFeaturedClasses from "../../components/SkeletonLoader/SkeletonFeaturedClasses";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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
  const [sortOrder, setSortOrder] = useState("asc");
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  if (isLoading) return <SkeletonFeaturedClasses />;

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  // Filter classes by search
  const filteredClasses = data?.classes?.filter((cls) => {
    const lower = search.toLowerCase();
    return (
      cls.name.toLowerCase().includes(lower) ||
      cls.details?.toLowerCase().includes(lower)
    );
  });

  // Sort classes by name
  const sortedClasses = filteredClasses?.slice().sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
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
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-lime-600 mb-1 text-center "
      >
        <span className="text-gray-800">Explore All </span>
        Fitness Classes
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-6"
      >
        Explore FitSphere’s wide range of fitness classes and connect with
        certified trainers to find the perfect session for your goals.
      </motion.p>

      {/*  Search &  Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Search */}
        <div className="flex items-center border rounded-lg shadow-md w-full sm:max-w-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-lime-400">
          <input
            type="text"
            placeholder="Type to filter classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={() => setSearch("")}
            className="text-gray-500 hover:text-red-500 px-4 transition-colors"
            title="Clear search"
          >
            ✕
          </button>
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-lime-400 hover:bg-lime-500 rounded-lg shadow-sm text-gray-800  border-1 cursor-pointer border-gray-400  font-medium transition-colors flex items-center gap-2"
        >
          {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* 🃏 Cards */}
      {sortedClasses?.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedClasses.map((cls) => (
            <motion.div key={cls._id} variants={cardVariants}>
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
        <div className="flex justify-center items-center gap-3 mt-10 mb-10">
          <motion.button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            whileHover={{ scale: page === 1 ? 1 : 1.05 }}
            whileTap={{ scale: page === 1 ? 1 : 0.95 }}
            className="px-2 py-1 bg-lime-200 rounded-lg hover:bg-lime-300 disabled:opacity-50 transition cursor-pointer"
          >
            <FaChevronLeft />
          </motion.button>

          {[...Array(totalPages).keys()].map((pg) => (
            <motion.button
              key={pg}
              onClick={() => setPage(pg + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                page === pg + 1
                  ? "bg-lime-500 text-white shadow-lg cursor-pointer"
                  : "bg-lime-100 text-gray-700 hover:bg-lime-200 cursor-pointer"
              }`}
            >
              Page {pg + 1}
            </motion.button>
          ))}

          <motion.button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            whileHover={{ scale: page === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: page === totalPages ? 1 : 0.95 }}
            className="px-3 py-2 bg-lime-200 rounded-lg hover:bg-lime-300 disabled:opacity-50 transition cursor-pointer"
          >
            <FaChevronRight />
          </motion.button>
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
