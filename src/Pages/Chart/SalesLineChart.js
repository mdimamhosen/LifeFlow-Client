import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Spiner from "../../Components/Spiner";

const options = {
  title: "Ammount Donation Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
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
          data={data}
          height="400px"
          options={options}
        />
      ) : (
        <>
          <p className="text-center text-red-500">No Sales Data Available</p>
        </>
      )}
    </div>
  );
};

export default SalesLineChart;
