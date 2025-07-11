// pages/Dashboard/BeATrainer.jsx
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

  const onSubmit = async (data) => {
    const trainerData = {
      ...data,
      email: user.email,
      status: "pending",
      availableDays: availableDays.map((d) => d.value),
    };

    try {
      const res = await axiosSecure.post("/trainers", trainerData);
      if (res.data.insertedId) {
        toast.success("Application submitted!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply as trainer (unauthorized?)");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Apply to Become a Trainer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          className="input w-full"
          placeholder="Full Name"
          required
        />
        <input value={user.email} disabled className="input w-full" />
        <input
          {...register("age")}
          type="number"
          className="input w-full"
          placeholder="Age"
          required
        />
        <input
          {...register("profileImage")}
          className="input w-full"
          placeholder="Profile Image URL"
          required
        />
        <div>
          <label>Select Skills (checkbox):</label>
          <div className="flex gap-3 flex-wrap">
            <label>
              <input type="checkbox" value="Yoga" {...register("skills")} />{" "}
              Yoga
            </label>
            <label>
              <input type="checkbox" value="Zumba" {...register("skills")} />{" "}
              Zumba
            </label>
            <label>
              <input type="checkbox" value="Cardio" {...register("skills")} />{" "}
              Cardio
            </label>
          </div>
        </div>
        <div>
          <label>Available Days</label>
          <Select
            isMulti
            options={daysOptions}
            onChange={(selected) => setAvailableDays(selected)}
            required
          />
        </div>
        <input
          {...register("availableTime")}
          placeholder="Available Time (e.g. 6-8PM)"
          className="input w-full"
        />
        <button type="submit" className="btn bg-lime-600 text-white w-full">
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeATrainer;
