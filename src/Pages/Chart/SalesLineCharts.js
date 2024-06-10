import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Spiner from "../../Components/Spiner";

const options = {
  title: "Blood Donation Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [
    { color: "#F44337" },
    { color: "#E91E60" },
    { color: "#9C27B0" },
    { color: "#673AB7" },
    { color: "#3F51B9" },
    { color: "#2196F3" },
    { color: "#00BCD4" },
    { color: "#4CAF50" },
  ],
};

const SalesLineChart = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="mt-10">
      {loading ? (
        <Spiner />
      ) : data?.length > 1 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      ) : (
        <>
          <p className="text-center text-red-500">No Donation Data Available</p>
        </>
      )}
    </div>
  );
};

export default SalesLineChart;
