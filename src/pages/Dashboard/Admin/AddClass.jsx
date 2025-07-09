import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const imageHostingKey = import.meta.env.VITE_IMGBB_API;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const onSubmit = async (data) => {
    setUploading(true);

    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Upload to imgbb
      const imageRes = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });

      const imgData = await imageRes.json();
      if (!imgData.success) throw new Error("Image upload failed");

      const classData = {
        name: data.name,
        image: imgData.data.display_url,
        details: data.details,
        extraInfo: data.extraInfo,
      };

      // Post to DB
      const res = await axiosSecure.post("/classes", classData);
      if (res.data.insertedId) {
        reset();
        toast.success("✅ Class added successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-lime-600 mb-6">
        Add a New Fitness Class
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Class Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="e.g. Full Body Burn"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Class Image
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Class Details
          </label>
          <textarea
            {...register("details", { required: true })}
            rows="4"
            placeholder="Describe this class (duration, intensity, goals...)"
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Additional Notes (optional)
          </label>
          <input
            {...register("extraInfo")}
            type="text"
            placeholder="e.g. Bring your own mat"
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
