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
              <span className="text-gray-800">Trainer</span> Information
            </h3>
            <p className="text-xs text-gray-500">
              Please fill out all the necessary details to become a certified
              trainer in our platform.
            </p>
          </div>

          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            {/* Name */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Full Name</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your name"
                required
                className="input w-full border-gray-300 focus:outline-lime-500"
              />
            </div>

            {/* Email */}
            <div className="col-span-full sm:col-span-3">
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="input w-full border border-gray-300 focus:outline-lime-500"
              />
            </div>

            {/* Age, Experience, Time, Days */}
            <div className="col-span-full">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm mb-1 block">Experience</label>
                  <input
                    {...register("experience")}
                    type="number"
                    placeholder="Years of Experience"
                    required
                    className="input w-full border-gray-300 focus:outline-lime-500"
                  />
                </div>
                <div>
                  <label className="text-sm mb-1 block">AvailableTime </label>
                  <input
                    {...register("availableTime")}
                    placeholder="Available Time (e.g. 6-8PM)"
                    className="input w-full border-gray-300 focus:outline-lime-500"
                  />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Available Day </label>
                  <Select
                    isMulti
                    options={daysOptions}
                    onChange={setAvailableDays}
                    className="w-full"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="col-span-full">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm mb-1 block">Age </label>
                  <input
                    {...register("age")}
                    type="number"
                    placeholder="Age"
                    required
                    className="input w-full border-gray-300 focus:outline-lime-500"
                  />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Facebook Link </label>
                  <input
                    {...register("facebook")}
                    type="url"
                    placeholder="Facebook Profile Link"
                    className="input w-full border-gray-300 focus:outline-lime-500"
                  />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Linkedin Link </label>
                  <input
                    {...register("linkedin")}
                    type="url"
                    placeholder="LinkedIn Profile Link"
                    className="input w-full border-gray-300 focus:outline-lime-500"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="col-span-full">
              <label className="text-sm">Skills</label>
              <div className="flex flex-wrap gap-4">
                {[
                  "Yoga",
                  "Zumba",
                  "Cardio",
                  "Pilates",
                  "Strength",
                  "CrossFit",
                  "Dance Fitness",
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

            {/* Upload Image */}
            <div className="col-span-full flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="w-full sm:w-1/2">
                <label className="text-sm">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input w-full border-gray-300 focus:outline-lime-500"
                />
              </div>
              <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
                {uploading && (
                  <p className="text-xs text-yellow-600">Uploading...</p>
                )}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover shadow"
                  />
                )}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition cursor-pointer"
          >
            Submit Application
          </button>
        </div>
      </form>
    </section>
  );
};

export default BeATrainer;
