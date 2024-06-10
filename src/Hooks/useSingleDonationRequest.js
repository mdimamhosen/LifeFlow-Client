import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosOpen } from "./useAxiosCommon";

const useSingleDonationRequest = () => {
  const { user } = useAuth();

  const {
    data: singledonationrequest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["singledonationrequest", id],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosOpen.get(`/singledonationrequest/${id}`);
      return res.data;
    },
  });

  return [alldonationrequest, refetch, isLoading];
};

export default useSingleDonationRequest;
