import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import TrainerCard from "../../components/TrainerCard/TrainerCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import TrainerCard from "../components/trainers/TrainerCard";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["confirmedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/confirmed-trainers");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-7xl mx-auto">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer._id} trainer={trainer} />
      ))}
    </section>
  );
};

export default AllTrainers;
