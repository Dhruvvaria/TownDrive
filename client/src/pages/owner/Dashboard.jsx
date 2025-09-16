import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

function Dashboard() {
  const { axios, isOwner, currency } = useAppContext();
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including totalcars, bookings, revenue and recent activities"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl ">
        {dashboardCards.map((card, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-boderColor">
            <div>
              <h1 className="text-xs text-gray-500">{card.title} </h1>
              <p className="text-lg font-semibold">{card.value} </p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rouded-full bg-primary/10">
              <img src={card.icon} className="w-4 h-4" alt="" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        <div className="p-4 md:p-6 border border-boderColor rounded-md max-w-lg w-full">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest customer bookings</p>
          {data.recentBookings.length === 0 && (
            <p className="text-red-500 mt-4">No recent bookings</p>
          )}
          {data.recentBookings.map((booking, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              key={index}
              className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                    src={assets.listIconColored}
                    className="h-5 w-5"
                    alt=""
                  />
                </div>
                <div>
                  <p className="">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p cltext-sm text-gray-500>
                    {booking.createdAt.split("T")[0]}{" "}
                  </p>
                </div>
              </div>
              <div className="flex- items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">
                  {currency} {booking.price}{" "}
                </p>
                <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
                  {booking.status}{" "}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 md:p-6 border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }}
            className="text-3xl mt-6 font-semibold text-primary">
            {currency} {data.monthlyRevenue}{" "}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
