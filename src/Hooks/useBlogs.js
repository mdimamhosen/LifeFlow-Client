import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosSecure } from "./useAxiosSecure";
import { axiosOpen } from "./useAxiosCommon";

const useBlog = () => {
  const { user } = useAuth();

  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosOpen.get(`/blogs`);
      return res.data;
    },
  });
  console.log(blogs);

  return [blogs, refetch, isLoading];
};

export default useBlog;
