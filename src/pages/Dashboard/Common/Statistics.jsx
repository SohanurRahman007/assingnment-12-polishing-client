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
          "Guide members with confidence",
          "Plan and manage your training slots",
          "Lead by example!",
        ];
      case "member":
        return [
          "Track your fitness journey",
          "Join classes and book trainers",
          "Stay consistent, stay fit!",
        ];
      default:
        return ["Explore the FitSphere dashboard"];
    }
  };

  const typedTexts = getTypedText(userInfo?.role);

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center px-4">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[.6]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)",
        }}
      />

      {/* Overlay text */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-lime-500">FitSphere</span>
        </h2>

        <h3 className="text-2xl md:text-3xl font-medium text-lime-500">
          <Typewriter
            words={typedTexts}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1800}
          />
        </h3>

        <p className="text-md text-gray-200 mt-4">
          Logged in as:
          <span className="capitalize font-semibold">{userInfo?.role}</span>
        </p>
      </div>
    </div>
  );
};

export default Statistics;
