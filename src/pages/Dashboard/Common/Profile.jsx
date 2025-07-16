import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateProfileModal from "../../../components/Modal/UpdateProfileModal";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user data from DB using TanStack Query
  const {
    data: dbUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleProfileUpdate = (updatedData) => {
    refetch(); // re-fetch data after update
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  const profile = {
    name: dbUser?.name || user?.displayName,
    email: dbUser?.email || user?.email,
    photoURL: dbUser?.photoURL || user?.photoURL,
    role: dbUser?.role || "Fitness Member",
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Cover */}
        <div
          className="h-48 w-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://i.ibb.co/tTpjgt9d/omar-lopez-rincon-BE181-Raj-rg-unsplash.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 -mt-14 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-lime-500 shadow-md bg-gray-100">
              <img
                src={
                  profile.photoURL ||
                  "https://i.ibb.co/YD1K9Lg/blank-profile.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center md:text-left flex-1 space-y-1">
              <h2 className="text-2xl font-bold text-lime-500">
                {profile.name}
              </h2>
              <span className="text-sm bg-lime-500 py-1 px-2 rounded-xl text-white font-medium uppercase tracking-wide">
                {profile.role}
              </span>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                {profile.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">User ID:</span>{" "}
                {user?.uid}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-end gap-4 pb-6">
            <button
              onClick={handleModalToggle}
              className="btn btn-outline outline-lime-500 hover:bg-lime-500 hover:text-white text-lime-500 border-lime-500 w-full sm:w-auto"
            >
              Update Profile
            </button>
            <button className="btn btn-success bg-lime-500 text-white border-none w-full sm:w-auto">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <UpdateProfileModal
          user={user}
          profile={profile}
          closeModal={handleModalToggle}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Profile;
