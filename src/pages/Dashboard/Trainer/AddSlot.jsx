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

  const { data: classes = [] } = useQuery({
    queryKey: ["allFitnessClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/trainer/all");
      return res.data.classes;
    },
  });

  console.log(classes);

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

    const res = await axiosSecure.post("/slots", slotData);
    if (res.data.insertedId) {
      toast.success("✅ Slot added successfully!");
      reset();
      setTime("10:00");
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
            Add New Slot
          </p>
          <p className="text-sm text-gray-500">
            Fill out the details for your training slot
          </p>
        </div>

        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          {/* Trainer Name */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Trainer Name
            </label>
            <input
              readOnly
              value={user.displayName || ""}
              className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Trainer Email */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Trainer Email
            </label>
            <input
              readOnly
              value={user.email}
              className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
          </div>

          {/* Slot Name */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Slot Name
            </label>
            <input
              {...register("slotName", { required: true })}
              placeholder="e.g. Morning Slot"
              className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
            {errors.slotName && (
              <p className="text-sm text-red-500">Slot name is required</p>
            )}
          </div>

          {/* Slot Time */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Slot Time
            </label>
            <div className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500">
              <TimePicker
                onChange={setTime}
                value={time}
                disableClock
                format="h:mm a"
                clearIcon={null}
                className="w-full"
              />
            </div>
          </div>

          {/* Days */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Select Days
            </label>
            <div className="border border-gray-300 rounded-md bg-white px-2 py-1">
              <Controller
                name="days"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} options={daysOptions} isMulti />
                )}
              />
            </div>
            {errors.days && (
              <p className="text-sm text-red-500 mt-1">Please select days</p>
            )}
          </div>

          {/* Class Selection */}
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Select Class
            </label>
            <select
              {...register("classId", { required: true })}
              className="block w-full px-4 py-2 mt-1 bg-gray-200 text-gray-700 border border-gray-300 rounded-md focus:outline-lime-500"
            >
              <option value="">-- Choose a class --</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.classId && (
              <p className="text-sm text-red-500 mt-1">Class is required</p>
            )}
          </div>

          {/* Other Info */}
          <div className="col-span-full">
            <label className="text-sm font-medium text-gray-700">
              Other Info
            </label>
            <textarea
              {...register("otherInfo")}
              placeholder="Optional notes"
              className="w-full px-4 py-2 mt-1 bg-gray-200 text-gray-700 border border-gray-300 rounded-md focus:outline-lime-500"
              rows={3}
            />
          </div>
        </div>
      </fieldset>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition cursor-pointer sm:w-1/2"
        >
          Add Slot
        </button>
      </div>
    </form>
  );
};

export default AddSlot;
