import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const AddClass = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const imageFile = watch("image")?.[0];

  // Set preview when image is selected
  if (imageFile && !previewUrl) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(imageFile);
  }

  const imageHostingKey = import.meta.env.VITE_IMGBB_API;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const onSubmit = async (data) => {
    setUploading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      const imageRes = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });

      const imgResult = await imageRes.json();
      if (!imgResult.success) throw new Error("Image upload failed");

      const newClass = {
        name: data.name,
        image: imgResult.data.display_url,
        details: data.details,
        extraInfo: data.extraInfo,
      };

      const res = await axiosSecure.post("/classes", newClass);
      if (res.data.insertedId) {
        reset();
        setPreviewUrl(null);
        toast.success("✅ Class added successfully!");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-md"
    >
      <fieldset className="grid grid-cols-4 bg-white gap-6 p-6 rounded-md shadow-sm">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="text-xl md:text-2xl font-semibold text-lime-600">
            Add New Class
          </p>
          <p className="text-sm text-gray-500">Enter details for your class</p>
        </div>

        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          {/* Class Name */}
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Class Name
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              placeholder="e.g. Cardio Boost"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Extra Info */}
          <div className="col-span-full sm:col-span-3">
            <label
              htmlFor="extraInfo"
              className="text-sm font-medium text-gray-700"
            >
              Extra Info
            </label>
            <input
              {...register("extraInfo")}
              id="extraInfo"
              type="text"
              placeholder="e.g. Bring water"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Details */}
          <div className="col-span-full">
            <label
              htmlFor="details"
              className="text-sm font-medium text-gray-700"
            >
              Class Description
            </label>
            <textarea
              {...register("details", { required: true })}
              id="details"
              rows="4"
              placeholder="Write a short description about the class..."
              className="textarea textarea-bordered w-full block px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Class Image
            </label>
            <div className="flex items-center gap-4">
              <img
                src={previewUrl || "https://via.placeholder.com/100?text=Image"}
                alt="Preview"
                className="w-16 h-16 rounded-xl border-lime-500 object-cover border shadow-sm"
              />
              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500 max-w-xs"
              />
            </div>
          </div>
        </div>
      </fieldset>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition cursor-pointer sm:w-1/2"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Class"}
        </button>
      </div>
    </form>
  );
};

export default AddClass;
