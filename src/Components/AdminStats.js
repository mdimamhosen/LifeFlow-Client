import { useState } from "react";
import { FaDonate, FaUsers } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { axiosOpen, axiosSecure } from "../Hooks/useAxiosSecure";
import Spiner from "./Spiner";
import SalesLineChart from "../Pages/Chart/SalesLineChart";
import SalesLineCharts from "../Pages/Chart/SalesLineCharts";

const AdminStats = () => {
  // Fetching all users
  const { data: users = [] } = useQuery({
    queryKey: "users",
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allusers", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data;
    },
  });

  // Fetching all donation requests
  const { data: donations = [], isLoading } = useQuery({
    queryKey: "donations",
    queryFn: async () => {
      const { data } = await axiosSecure.get("/alldonationRequest", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data;
    },
  });
  const { data: fund = [], refetch } = useQuery({
    queryKey: ["fund"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donate", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data;
    },
  });
  const totalDonations = fund.reduce((acc, curr) => acc + curr.amount, 0);

  // Fetch Admin Stat Data here
  const { data: statDataDonation = [] } = useQuery({
    queryKey: ["statDataDonation"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stat-donation", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data;
    },
  });
  const { data: statDataBloodDonation = [] } = useQuery({
    queryKey: ["statDataBloodDonation"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stat-bloodDonation", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return data;
    },
  });

  if (isLoading) return <Spiner />;
  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users Card */}
        <div className="card bg-blue-200 text-blue-800 rounded-xl p-8 flex items-center">
          <FaUsers className="text-5xl mr-4" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold mb-2">Total Users</h1>
            <p className="text-3xl font-extrabold">{users.length}</p>
            <p className="text-sm mt-2">
              As of {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Blood Donations Card */}
        <div className="card bg-red-200 text-red-800 rounded-xl p-8 flex items-center">
          <BiSolidDonateBlood className="text-5xl mr-4" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold mb-2">Total Blood Donations</h1>
            <p className="text-3xl font-extrabold">{donations.length}</p>
            <p className="text-sm mt-2">
              As of {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Total Fundings Card */}
        <div className="card bg-yellow-200 text-yellow-800 rounded-xl p-8 flex items-center">
          <FaDonate className="text-5xl mr-4" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold mb-2">Total Fundings</h1>
            <p className="text-3xl font-extrabold">{totalDonations} $</p>
            <p className="text-sm mt-2">
              As of {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
        <div>
          <SalesLineChart data={statDataDonation?.chartData} />
        </div>
        <div>
          <SalesLineCharts data={statDataBloodDonation?.chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
