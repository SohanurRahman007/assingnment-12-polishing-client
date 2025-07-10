import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Navigate } from "react-router";

const ClassesPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classData = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes?page=1");
      return res.data.classes; // or handle pagination logic
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {classData.map((cls) => (
        <div key={cls._id} className="bg-white p-4 rounded shadow">
          <img
            src={cls.image}
            alt={cls.name}
            className="h-40 w-full object-cover"
          />
          <h2 className="text-xl font-bold mt-2">{cls.name}</h2>
          <p>{cls.details}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Trainers:</h3>
            <div className="flex gap-2 mt-1">
              {cls.trainers?.slice(0, 5).map((trainer) => (
                <img
                  key={trainer.email}
                  src={trainer.photo}
                  alt={trainer.name}
                  title={trainer.name}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => Navigate(`/trainers/${trainer.email}`)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassesPage;
