import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAuth from "./useAuth";
import { axiosOpen } from "./useAxiosCommon";

const useUserInfo = () => {
  const { user } = useAuth();

  const {
    data: userInfo = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosOpen.get(`/users/info?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });
  console.log(userInfo, "userInfo");

  return [userInfo, refetch, isLoading];
};

export default useUserInfo;
