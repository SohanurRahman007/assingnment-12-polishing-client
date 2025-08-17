import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AddClass = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const imageFile = watch("image")?.[0];

  // Generate preview when file selected
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
    <div className="max-w-5xl mx-auto my-10 p-6 bg-gray-100 rounded-md shadow-md">
      <Helmet>
        <title>Add Class | FitSphere Dashboard</title>
        <meta
          name="description"
          content="Admin dashboard page to add new classes in FitSphere."
        />
      </Helmet>
      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-white">
        {/* Left Info Column */}
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="text-xl font-semibold text-lime-600">
            <span className="text-gray-800">Add</span> New Class
          </p>
          <p className="text-xs text-gray-600">
            Provide details for the new class, including description and an
            image.
          </p>
        </div>

        {/* Right Form Column */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"
        >
          {/* Class Name */}
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="name" className="text-sm font-medium">
              Class Name
            </label>
            <input
              {...register("name", { required: "Class name is required" })}
              id="name"
              type="text"
              placeholder="e.g. Cardio Boost"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Extra Info */}
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="extraInfo" className="text-sm font-medium">
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

          {/* Class Description */}
          <div className="col-span-full">
            <label htmlFor="details" className="text-sm font-medium">
              Class Description
            </label>
            <textarea
              {...register("details", { required: "Description is required" })}
              id="details"
              rows={5}
              placeholder="Write a short description about the class..."
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Image Upload & Preview */}
          <div className="col-span-full">
            <label className="text-sm font-medium block mb-2">
              Class Image
            </label>
            <div className="flex items-center gap-4">
              <img
                src={previewUrl || "https://via.placeholder.com/100?text=Image"}
                alt="Preview"
                className="w-16 h-16 rounded-xl border-lime-500 object-cover border shadow-sm"
              />
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                accept="image/*"
                className="block w-full  px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full text-right">
            <button
              type="submit"
              disabled={uploading}
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-6 rounded-md transition cursor-pointer"
            >
              {uploading ? "Uploading..." : "Add Class"}
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default AddClass;
