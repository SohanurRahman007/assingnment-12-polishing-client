import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
    labels: ["Newsletter Subscribers", "Paid Members"],
    datasets: [
      {
        label: "Users",
        data: [data.totalSubscribers, data.totalPaidMembers],
        backgroundColor: ["#84cc16", "#22c55e"], // lime + green
        hoverOffset: 20,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        💰 Admin Balance Overview
      </h1>

      {/* Balance card */}
      <div className="bg-gradient-to-r from-lime-100 to-green-100 p-6 rounded-xl shadow-md mb-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
        <p className="text-4xl font-bold text-green-600 mt-2">
          ${data.totalBalance}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto mb-10">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Booking Payments
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Trainer
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Slot
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Pack
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Price ($)
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">
                Paid At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.lastSixPayments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No recent transactions.
                </td>
              </tr>
            ) : (
              data.lastSixPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{payment.name}</td>
                  <td className="px-6 py-4">{payment.trainerName}</td>
                  <td className="px-6 py-4">{payment.slot}</td>
                  <td className="px-6 py-4 capitalize">{payment.pack}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
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
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Subscribers vs Paid Members
        </h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default AdminBalance;
