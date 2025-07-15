import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ClassCard from "../../components/ClassCard/ClassCard";
import ClassDetailsModal from "../../components/Modal/ClassDetailsModal";
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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 6;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["classes", page, debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes?page=${page}&limit=${limit}&search=${debouncedSearch}`
      );
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

  if (isLoading) return <LoadingSpinner />;

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <Container>
      <Helmet>
        <title>All Class | FitSphere</title>
      </Helmet>
      <div>
        {/* Animated Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 text-center"
        >
          Explore All <span className="text-lime-600">Fitness Classes</span>
        </motion.h2>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl text-center mx-auto text-gray-600 text-sm md:text-md px-4 leading-relaxed mb-6"
        >
          Explore our diverse range of certified trainers, each bringing their
          unique expertise to help you reach your fitness goals. Whether you're
          into yoga, strength training, or dance workouts — we have the right
          coach for you!
        </motion.p>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search classes by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-lime-300"
          />
        </div>

        {/* Cards Grid with animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data?.classes?.map((cls) => (
            <motion.div key={cls._id} variants={cardVariants}>
              <ClassCard cls={cls} onViewDetails={() => openModal(cls)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination with animated buttons */}
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
      </div>
    </Container>
  );
};

export default AllClasses;
