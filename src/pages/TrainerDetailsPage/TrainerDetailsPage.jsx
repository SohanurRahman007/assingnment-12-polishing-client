import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Facebook,
  Linkedin,
  CalendarCheck,
  Clock,
  Dumbbell,
  User,
  BadgeCheck,
  Mail,
  SeparatorVertical,
  Contact,
} from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Container from "../../components/Shared/Container";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const TrainerDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: trainer = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/confirmed-trainers/${id}`);
      return res.data;
    },
  });

  console.log(trainer);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-center text-red-500 mt-10">Trainer not found.</p>;

  return (
    <Container>
      <div className="py-6">
        <Helmet>
          <title>Trainer Details | FitSphere</title>
        </Helmet>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center justify-center">
          {/* Left Side: Trainer Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2 shadow-md rounded-xl"
          >
            <div className="overflow-hidden  rounded-t-xl  group">
              <img
                src={trainer.profileImage}
                alt={trainer.name}
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-2 p-2 text-gray-700">
              <h2 className="text-3xl font-bold text-lime-600">
                {trainer.name}
              </h2>

              <div className="flex flex-wrap gap-6 text-sm">
                <p className="flex items-center gap-1">
                  <User className="w-4 h-4 text-lime-500" />
                  Age: <span className="font-medium">{trainer.age}</span>
                </p>
                <p className="flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4 text-lime-500" />
                  Experience:{" "}
                  <span className="font-medium">
                    {trainer.experience || "N/A"} years
                  </span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Dumbbell className="w-4 h-4 text-lime-500" />
                  <span className="font-medium">Skills:</span>{" "}
                  <span>{trainer.skills?.join(", ") || "N/A"}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <p className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-lime-500" />
                  <span className="font-medium">Available Time:</span>{" "}
                  <span>{trainer.availableTime || "N/A"}</span>
                </p>

                <p className="flex items-center gap-2 text-sm">
                  <CalendarCheck className="w-4 h-4 text-lime-500" />
                  <span className="font-medium">Available Days:</span>{" "}
                  <span>{trainer.availableDays?.join(", ") || "N/A"}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                {/* Email */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-lime-500" />
                  <span className="font-medium">Email:</span>
                  <span>{trainer.email}</span>
                </div>

                {/* Divider for small screens */}
                <div className="hidden sm:block h-4 w-px bg-gray-400" />

                {/* Social Links */}
                <div className="flex items-center gap-1 lg:gap-3 text-sm text-gray-600">
                  <Contact className="w-4 h-4 text-lime-500" />
                  <span className="font-medium">Social:</span>
                  {trainer.facebook && (
                    <a
                      href={trainer.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition text-sky-600"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {trainer.linkedin && (
                    <a
                      href={trainer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-sky-100 transition text-sky-600"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Slots + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Available Slots
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Choose a day that works best for you to book a personalized
                session with this trainer. Slots are based on their weekly
                availability—hurry before they're filled!
              </p>
            </div>

            {trainer.availableDays?.length ? (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-lime-100 px-4 py-2 text-left text-sm font-medium text-lime-700 hover:bg-lime-200 transition">
                      <span>Select a Day</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-lime-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2">
                      <div className="flex flex-wrap gap-3">
                        {trainer.availableDays.map((day, i) => (
                          <Link
                            key={i}
                            to={`/book-trainer/${trainer._id}/${day}`}
                            className="px-4 py-2 text-sm bg-lime-600 text-white rounded hover:bg-lime-700 transition"
                          >
                            {day}
                          </Link>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ) : (
              <p className="text-sm text-gray-500">
                No slots available at the moment.
              </p>
            )}

            {/* Become Trainer CTA */}
            <div className="mt-10 border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                Want to inspire others like {trainer.name}?
              </h4>
              <Link
                to="/dashboard/be-a-trainer"
                className="inline-block px-5 py-2 text-sm bg-lime-600 text-white rounded-md hover:bg-lime-700 transition"
              >
                Become a Trainer
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default TrainerDetailsPage;
