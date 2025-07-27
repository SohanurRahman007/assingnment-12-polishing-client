import { useEffect, useState } from "react";
import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { Doughnut } from "react-chartjs-2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LoadingSpinner from "../../Shared/LoadingSpinner";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminStatistics = () => {
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
        toast.error("Failed to load dashboard data");
      }
    };

    fetchBalanceOverview();
  }, [axiosSecure]);
  if (!data) return <LoadingSpinner />;
  const chartData = {
    labels: ["Subscribers", "Paid Members"],
    datasets: [
      {
        label: "User Type",
        data: [data.totalSubscribers, data.totalPaidMembers],
        backgroundColor: ["#3b82f6", "#10b981"],
        borderColor: ["#e5e7eb", "#e5e7eb"],
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#374151",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const statCards = [
    {
      icon: <FaDollarSign className=" h-6 text-white" />,
      title: "Total Revenue",
      value: `$${data.totalBalance}`,
      from: "from-orange-500",
      to: "to-orange-300",
    },
    // {
    //   icon: <BsFillCartPlusFill className="w-6 h-6 text-white" />,
    //   title: "Total Orders",
    //   value: data.lastSixPayments.length,
    //   from: "from-indigo-500",
    //   to: "to-indigo-300",
    // },
    {
      icon: <BsFillHouseDoorFill className=" h-6 text-white" />,
      title: "Total Members",
      value: data.totalPaidMembers,
      from: "from-pink-500",
      to: "to-pink-300",
    },
    {
      icon: <FaUserAlt className=" h-6 text-white" />,
      title: "Subscribers",
      value: data.totalSubscribers,
      from: "from-emerald-500",
      to: "to-emerald-300",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        📊 <span className="text-lime-500">Admin</span> Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`relative bg-white shadow-md p-4 rounded-xl flex items-center gap-4`}
          >
            <div
              className={`h-14 w-14 rounded-xl grid place-items-center bg-gradient-to-tr ${card.from} ${card.to} shadow-md`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h4 className="text-2xl font-bold text-gray-800">{card.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 gap-8">
        {/* Doughnut Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">
            🎯 User Distribution
          </h2>
          {data.totalSubscribers === 0 && data.totalPaidMembers === 0 ? (
            <p className="text-center text-gray-400 py-12">
              No user data available.
            </p>
          ) : (
            <div className="max-w-xs mx-auto">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            💳 Recent Payments
          </h2>
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-lime-300 text-gray-700">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Trainer</th>
                <th className="px-4 py-3">Slot</th>
                <th className="px-4 py-3">Pack</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {data.lastSixPayments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No recent payments found.
                  </td>
                </tr>
              ) : (
                data.lastSixPayments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-lime-200 transition"
                  >
                    <td className="px-4 py-3">{payment.name}</td>
                    <td className="px-4 py-3">{payment.trainerName}</td>
                    <td className="px-4 py-3">{payment.slot}</td>
                    <td className="px-4 py-3 capitalize">{payment.pack}</td>
                    <td className="px-4 py-3 font-medium text-green-600">
                      ${payment.price}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(payment.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
