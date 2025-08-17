import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminBalance = () => {
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState({
    totalBalance: 0,
    lastSixPayments: [],
    totalSubscribers: 0,
    totalPaidMembers: 0,
  });

  useEffect(() => {
    const fetchBalanceOverview = async () => {
      try {
        const res = await axiosSecure.get("/admin/balance-overview");
        setData(res.data);
      } catch (error) {
        toast.error("Failed to load balance overview");
      }
    };

    fetchBalanceOverview();
  }, [axiosSecure]);

  const pieData = {
    labels: ["Subscribers", "Paid Members"],
    datasets: [
      {
        label: "Users",
        data: [data.totalSubscribers, data.totalPaidMembers],
        backgroundColor: ["#84cc16", "#22c55e"],
        hoverOffset: 20,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Admin Dashboard | FitSphere</title>
        <meta
          name="description"
          content="Admin dashboard of FitSphere to manage users, newsletters, classes, forums, and trainers."
        />
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        💼 Admin Balance Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Balance + Pie Chart Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Revenue Card */}
          <div className="bg-gradient-to-r from-lime-100 to-green-100 p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-medium text-gray-700">Total Revenue</h2>
            <p className="text-4xl font-extrabold text-green-600 mt-2">
              ${data.totalBalance}
            </p>
          </div>

          {/* Pie Chart Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
              Subscribers vs Paid Members
            </h2>
            <Pie data={pieData} />
          </div>
        </motion.div>

        {/* Payments Table Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-x-auto"
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Booking Payments
            </h2>
          </div>

          {/* Horizontal Line */}
          <div className="h-[2px] bg-gradient-to-r from-lime-400 via-green-400 to-transparent mb-1" />

          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Name",
                  "Trainer",
                  "Slot",
                  "Pack",
                  "Price ($)",
                  "Paid At",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left font-medium text-gray-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.lastSixPayments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-6">
                    No recent transactions found.
                  </td>
                </tr>
              ) : (
                data.lastSixPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{payment.name}</td>
                    <td className="px-6 py-4">{payment.trainerName}</td>
                    <td className="px-6 py-4">{payment.slot}</td>
                    <td className="px-6 py-4 capitalize">{payment.pack}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ${payment.price}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(payment.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminBalance;
