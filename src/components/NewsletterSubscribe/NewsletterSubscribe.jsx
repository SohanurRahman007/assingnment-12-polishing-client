import { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const NewsletterSubscribe = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosSecure.post("/newsletter/subscribe", form);
      toast.success(res.data.message || "Subscribed successfully!");
      setForm({ name: "", email: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Subscription failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-aos="fade-up"
      className="bg-white  py-10 px-6 rounded-2xl shadow-xl max-w-3xl mx-auto mt-10 border border-gray-200 mb-2"
    >
      <div className="text-center mb-6" data-aos="fade-down">
        <FaEnvelopeOpenText className="text-5xl text-lime-500 mx-auto mb-3" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800">
          Subscribe to our Newsletter
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          No login required. Get latest updates & offers!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="p-3 border border-slate-300 focus:border-lime-500 focus:ring-2 focus:outline-lime-500 focus:ring-lime-300 rounded-md text-sm"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="p-3 border border-slate-300 focus:border-lime-500 focus:outline-lime-500 focus:ring-lime-300 rounded-md text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-lime-500 hover:bg-lime-600 transition duration-200 text-white font-semibold rounded-md px-6 py-3 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscribe;
