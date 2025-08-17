import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AddForum = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const forumData = {
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      userRole: user?.role || "member",
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/forums", forumData);
      if (res.data.insertedId) {
        toast.success("Forum post added successfully!");
        reset();
      }
    } catch (error) {
      toast.error("Failed to add forum post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-gray-100 rounded-md shadow-md">
      <Helmet>
        <title>Add New Forum | FitSphere Dashboard</title>
        <meta
          name="description"
          content="Admin or Trainer dashboard page to create a new forum in FitSphere."
        />
      </Helmet>

      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-white">
        {/* Left info column */}
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="text-xl font-semibold text-lime-600">
            <span className="text-gray-800">Add</span> New Forum
          </p>
          <p className="text-xs text-gray-600">
            Write your forum post details here. Admin and Trainer posts will be
            tagged accordingly.
          </p>
        </div>

        {/* Form inputs */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"
        >
          {/* User Name (read only) */}
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="userName" className="text-sm font-medium">
              User Name
            </label>
            <input
              id="userName"
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500 cursor-not-allowed"
            />
          </div>

          {/* Email (read only) */}
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              readOnly
              value={user?.email || ""}
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500 cursor-not-allowed"
            />
          </div>

          {/* Forum Title */}
          <div className="col-span-full">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter forum title"
              className={`block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Forum Content */}
          <div className="col-span-full">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <textarea
              id="content"
              {...register("content", { required: "Content is required" })}
              rows={5}
              placeholder="Write your forum content here..."
              className={`block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500 ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-full text-right">
            <button
              type="submit"
              disabled={submitting}
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-6 rounded-md transition cursor-pointer"
            >
              {submitting ? "Submitting..." : "Add Forum Post"}
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default AddForum;
