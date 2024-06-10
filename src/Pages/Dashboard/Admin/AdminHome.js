import AdminStats from "../../../Components/AdminStats";
import DonationRequest from "../../../Components/DonationRequest";
import useUserInfo from "../../../Hooks/useUserInfo";

const AdminHome = () => {
  const [userInfo, refetch] = useUserInfo();
  refetch();
  return (
    <div className="mx-4 lg:mx-12">
      <div>
        <h1 className="text-3xl lg:text-5xl font-bold text-center">
          Welcome to Dashboard {userInfo?.name}
        </h1>
      </div>
      <div className=" mt-4">
        <AdminStats />
      </div>
    </div>
  );
};

AdminHome.propTypes = {};

export default AdminHome;
