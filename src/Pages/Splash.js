import React, { useEffect, useState } from "react";

const Splash = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {loading ? (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-400 h-24 w-24"></div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Blood Donation Website
          </h1>
        </div>
      )}
    </div>
  );
};

export default Splash;
