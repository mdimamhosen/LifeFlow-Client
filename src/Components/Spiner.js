import React from "react";
import { Audio } from "react-loader-spinner";
const Spiner = () => {
  return (
    <div className="h-screen bg-gray-200 w-screen flex justify-center items-center">
      <Audio
        height="100"
        width="100"
        color="red"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};

export default Spiner;
