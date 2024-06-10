import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosOpen } from "./useAxiosCommon";

const useAllDonationRequest = () => {
  const { user } = useAuth();

  const {
    data: alldonationrequest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["alldonationrequest", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosOpen.get(`/alldonationrequest/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });

  return [alldonationrequest, refetch, isLoading];
};

export default useAllDonationRequest;
