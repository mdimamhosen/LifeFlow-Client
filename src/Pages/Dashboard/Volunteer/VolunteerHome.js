import React from "react";
import AdminStats from "../../../Components/AdminStats";
import useUserInfo from "../../../Hooks/useUserInfo";

const VolunteerHome = () => {
  const [userInfo, refetch] = useUserInfo();
  refetch();
  return (
    <div className="mx-4 lg:mx-12">
      <div>
        <h1 className="text-3xl text-center lg:text-5xl font-bold">
          Welcome to Dashboard {userInfo?.name}
        </h1>
      </div>
      <div className=" mt-8 flex justify-center items-center">
        <AdminStats />
      </div>
    </div>
  );
};

export default VolunteerHome;
