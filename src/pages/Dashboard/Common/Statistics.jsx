import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Typewriter } from "react-simple-typewriter";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Statistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const getTypedText = (role) => {
    switch (role) {
      case "trainer":
        return [
          "members with confidence",
          "your training slots",
          "by example!",
        ];
      case "member":
        return [
          "your fitness journey",
          "classes and book trainers",
          "consistent, stay fit!",
        ];
      default:
        return ["FitSphere dashboard"];
    }
  };

  const typedTexts = getTypedText(userInfo?.role);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center mt-16">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content box */}
      <div className="relative z-10 text-center text-white px-6 py-10 max-w-2xl rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-lime-500">FitSphere</span>
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold mb-3 h-[40px]">
          <span className="text-white">Explore the </span>
          <span className="text-lime-500">
            <Typewriter
              words={typedTexts}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1800}
            />
          </span>
        </h3>

        <p className="text-md text-gray-200 mt-4">
          Logged in as:{" "}
          <span className="capitalize font-semibold text-lime-400">
            {userInfo?.role}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Statistics;
