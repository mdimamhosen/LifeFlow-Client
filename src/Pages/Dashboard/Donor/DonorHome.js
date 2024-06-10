import useUserInfo from "../../../Hooks/useUserInfo";
import RequestedDonations from "./RequestDonations";

const DonorHome = () => {
  const [userInfo, refetch] = useUserInfo();

  refetch();
  return (
    <div className="">
      <div>
        <h1 className=" text-3xl lg:text-5xl font-bold text-center">
          Welcome to Dashboard {userInfo?.name}
        </h1>
      </div>
      <div>
        <RequestedDonations />
      </div>
    </div>
  );
};

export default DonorHome;
