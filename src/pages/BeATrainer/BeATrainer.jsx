import { useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const daysOptions = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

const BeATrainer = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [availableDays, setAvailableDays] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const imgbbKey = import.meta.env.VITE_IMGBB_API;

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrl(data.data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const trainerData = {
      ...data,
      email: user.email,
      profileImage: imageUrl,
      availableDays: availableDays.map((day) => day.value),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/trainers", trainerData);
      if (res.data.insertedId) {
        toast.success("Trainer application submitted!");
        reset();
        setImageUrl("");
        setAvailableDays([]);
      }
    } catch (err) {
      toast.error("Submission failed");
    }
  };

  return (
    <section className="p-8 bg-gray-100 animate-fade-in">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container flex flex-col mx-auto space-y-4"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50 bg-white">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <h3 className="font-medium text-lime-500 text-xl md:text-2xl">
              Trainer Information
            </h3>
            <p className="text-xs text-gray-500">
              Please fill out all the necessary details to become a certified
              trainer in our platform.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="name" className="text-sm">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your name"
                required
                className="input w-full border-gray-300 focus:outline-lime-500"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="input w-full border-gray-300 focus:outline-lime-500"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="age" className="text-sm">
                Age
              </label>
              <input
                {...register("age")}
                type="number"
                placeholder="Your age"
                required
                className="input w-full border-gray-300 focus:outline-lime-500"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="availableTime" className="text-sm">
                Available Time
              </label>
              <input
                {...register("availableTime")}
                placeholder="e.g. 6-8PM"
                className="input w-full border-gray-300 focus:outline-lime-500"
              />
            </div>
            <div className="col-span-full">
              <label className="text-sm">Skills</label>
              <div className="flex flex-wrap gap-4">
                {[
                  "Yoga",
                  "Zumba",
                  "Cardio",
                  "Pilates",
                  "HIIT",
                  "Strength Training",
                  "CrossFit",
                  "Dance Fitness",
                  "Kickboxing",
                  "Spin Class",
                  "Barre",
                  "Stretch & Mobility",
                ].map((skill) => (
                  <label key={skill} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={skill}
                      {...register("skills")}
                      className="checkbox checkbox-sm"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            <div className="col-span-full">
              <label className="text-sm">Available Days</label>
              <Select
                isMulti
                options={daysOptions}
                onChange={setAvailableDays}
                className="mt-1"
              />
            </div>
            <div className="col-span-full flex justify-between items-center">
              <div>
                <label className="text-sm">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input w-full border-gray-300 focus:outline-lime-500"
                />
              </div>
              <div>
                {uploading && (
                  <p className="text-xs text-yellow-600 mt-2">Uploading...</p>
                )}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-16 h-16 mt-2 rounded-xl object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-md transition cursor-pointer"
          >
            Submit Application
          </button>
        </div>
      </form>
    </section>
  );
};

export default BeATrainer;
