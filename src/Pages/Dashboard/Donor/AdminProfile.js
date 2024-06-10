import UserProfile from "../../../Components/UserProfile";
import useUserInfo from "../../../Hooks/useUserInfo";

const AdminProfile = () => {
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

export default AdminProfile;
