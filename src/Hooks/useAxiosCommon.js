import axios from "axios";

export const axiosOpen = axios.create({
  baseURL: "https://lifeflow-two.vercel.app",
});
const useAxiosOpen = () => {
  return axiosOpen;
};

export default useAxiosOpen;
