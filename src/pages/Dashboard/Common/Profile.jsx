import useAuth from "../../../hooks/useAuth";
// import coverImg from "../../../assets/images/cover-image.jpeg";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Cover Photo */}
        <div
          className="h-48 w-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://i.ibb.co/tTpjgt9d/omar-lopez-rincon-BE181-Raj-rg-unsplash.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Profile Content */}
        <div className="px-6 md:px-10 -mt-14 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-lime-500 shadow-md bg-gray-100">
              <img
                src={
                  user?.photoURL || "https://i.ibb.co/YD1K9Lg/blank-profile.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1 space-y-1">
              <h2 className="text-2xl font-bold text-lime-500">
                {user?.displayName || "Unknown User"}
              </h2>
              <span className="text-sm bg-lime-500 py-1 px-2 rounded-xl text-white mt-1 font-medium uppercase tracking-wide">
                Fitness Member
              </span>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                {user?.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">User ID:</span>{" "}
                {user?.uid}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-end gap-4 pb-6">
            <button className="btn btn-outline outline-lime-500 hover:bg-lime-500 hover:text-white text-lime-500 border-lime-500 btn-success w-full sm:w-auto">
              Update Profile
            </button>
            <button className="btn btn-success bg-lime-500 text-white border-none w-full sm:w-auto">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
