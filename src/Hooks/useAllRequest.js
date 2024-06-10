import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosOpen } from "./useAxiosCommon";

const useAllRequest = () => {
  const { user } = useAuth();

  const {
    data: alldonationrequest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["alldonationrequest"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosOpen.get(`/alldonationRequest`);
      return res.data;
    },
  });

  return [alldonationrequest, refetch, isLoading];
};

export default useAllRequest;
