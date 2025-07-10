import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const dayOptions = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];

const AddSlot = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [classList, setClassList] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/classes`)
      .then((res) => setClassList(res.data));
  }, []);

  const onSubmit = async (data) => {
    const slotData = {
      trainerEmail: user.email,
      trainerName: user.name,
      trainerPhoto: user.photoURL,
      slotName: data.slotName,
      slotTime: data.slotTime,
      selectedDays: data.selectedDays.map((day) => day.value),
      className: data.className,
      classId: data.classId,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/slots`,
        slotData
      );
      toast.success("Slot added successfully!");
      reset();
    } catch (err) {
      toast.error("Error adding slot.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl mb-4">Add New Slot</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("slotName")}
          placeholder="Slot Name"
          className="input input-bordered w-full"
          required
        />
        <input
          {...register("slotTime")}
          placeholder="Slot Time"
          className="input input-bordered w-full"
          required
        />

        <Controller
          control={control}
          name="selectedDays"
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={dayOptions}
              placeholder="Select Available Days"
              className="text-black"
            />
          )}
        />

        <select
          {...register("className")}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Class</option>
          {classList.map((cls) => (
            <option key={cls._id} value={cls.name}>
              {cls.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
