import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const AddSlot = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [time, setTime] = useState("10:00");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch all classes for trainer
  const { data: classes = [] } = useQuery({
    queryKey: ["allFitnessClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/trainer/all");
      return res.data.classes;
    },
  });

  const daysOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const onSubmit = async (data) => {
    if (!time) return toast.error("Please select a slot time");

    const slotData = {
      trainerEmail: user.email,
      trainerName: user.displayName,
      slotName: data.slotName,
      slotTime: time,
      days: data.days.map((d) => d.value),
      classId: data.classId,
      booked: false,
      bookedBy: null,
      otherInfo: data.otherInfo || "",
    };

    try {
      const res = await axiosSecure.post("/slots", slotData);
      if (res.data.insertedId) {
        toast.success("✅ Slot added successfully!");
        reset();
        setTime("10:00");
      }
    } catch (error) {
      toast.error("Failed to add slot.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-gray-100 rounded-md shadow-md">
      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-white">
        {/* Left info column */}
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="text-xl font-semibold text-lime-600">Add New Slot</p>
          <p className="text-xs text-gray-600">
            Fill out the details for your training slot. Members will see
            available slots under their selected class.
          </p>
        </div>

        {/* Right form inputs */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"
        >
          {/* Trainer Name */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium">Trainer Name</label>
            <input
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500 cursor-not-allowed"
            />
          </div>

          {/* Trainer Email */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium">Trainer Email</label>
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500 cursor-not-allowed"
            />
          </div>

          {/* Slot Name */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium">Slot Name</label>
            <input
              {...register("slotName", { required: "Slot name is required" })}
              placeholder="e.g. Morning Slot"
              className={`block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-lime-500 ${
                errors.slotName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.slotName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.slotName.message}
              </p>
            )}
          </div>

          {/* Slot Time */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium">Slot Time</label>
            <div className="block w-full px-2 py-1 bg-gray-200 border rounded-md border-gray-300">
              <TimePicker
                onChange={setTime}
                value={time}
                disableClock
                format="h:mm a"
                clearIcon={null}
                className="w-full bg-transparent"
              />
            </div>
          </div>

          {/* Select Days */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium">Select Days</label>
            <div className="border border-gray-300 rounded-md bg-white px-2 py-1 mt-1">
              <Controller
                name="days"
                control={control}
                rules={{ required: "Please select at least one day" }}
                render={({ field }) => (
                  <Select {...field} options={daysOptions} isMulti />
                )}
              />
            </div>
            {errors.days && (
              <p className="text-red-500 text-xs mt-1">{errors.days.message}</p>
            )}
          </div>

          {/* Select Class */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium">Select Class</label>
            <select
              {...register("classId", { required: "Class is required" })}
              className={`block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-lime-500 ${
                errors.classId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Choose a class --</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.classId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.classId.message}
              </p>
            )}
          </div>

          {/* Other Info */}
          <div className="col-span-full">
            <label className="text-sm font-medium">Other Info</label>
            <textarea
              {...register("otherInfo")}
              placeholder="Optional notes..."
              rows={3}
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full text-right">
            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-8 rounded-md transition cursor-pointer"
            >
              Add Slot
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default AddSlot;
