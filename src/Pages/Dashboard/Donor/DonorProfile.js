import React from "react";
import UserProfile from "../../../Components/UserProfile";
import useUserInfo from "../../../Hooks/useUserInfo";

const DonorProfile = () => {
  const [userInfo, refetch, isLoading] = useUserInfo();

  return (
    <div className="">
      <UserProfile
        userInfo={userInfo}
        refetch={refetch}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DonorProfile;
