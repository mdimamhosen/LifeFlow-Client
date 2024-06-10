import { useQuery } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import Spiner from "./Spiner";

const CurrentRequest = () => {
  const { data: user = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosOpen.get("/allusers");
      return res.data;
    },
  });
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (isLoading) return <Spiner />;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-200 pb-12 px-4  lg:px-20">
      <div>
        <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit">
          Blood Donation Benefits
        </h1>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" checked="checked" />
            <div className="collapse-title text-xl font-extrabold">
              What are the health benefits of donating blood?
            </div>
            <div className="collapse-content">
              <p>
                Donating blood helps in reducing iron overload, improves
                cardiovascular health, and can even reduce cancer risk.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-extrabold">
              How often can I donate blood?
            </div>
            <div className="collapse-content">
              <p>
                You can donate whole blood every 56 days, platelets every 7
                days, and plasma every 28 days. Always check with your local
                blood center for specific guidelines.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-extrabold">
              Are there any side effects of donating blood?
            </div>
            <div className="collapse-content">
              <p>
                Most people experience no serious side effects. Some may feel
                lightheaded or have minor bruising at the needle site, which
                usually resolves quickly.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-extrabold">
              Who can donate blood?
            </div>
            <div className="collapse-content">
              <p>
                Generally, anyone who is in good health, at least 16 years old
                (with parental consent if under 18), and weighs at least 110
                pounds can donate. Specific eligibility criteria can vary.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit">
          Top Donors
        </h1>
        <ul className="space-y-2">
          <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
            <FaHeart className="text-2xl text-red-500" />{" "}
            <p>
              {user[0]?.bloodGroup}, {user[0]?.name}, {user[0]?.district}{" "}
              {user[0]?.upazila} ({formatDate(user[0]?.timestamp)})
            </p>
          </li>
          <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
            <FaHeart className="text-2xl text-red-500" />{" "}
            <p>
              {user[1]?.bloodGroup}, {user[1]?.name}, {user[1]?.district}{" "}
              {user[1]?.upazila} ({formatDate(user[1]?.timestamp)})
            </p>
          </li>
          <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
            <FaHeart className="text-2xl text-red-500" />{" "}
            <p>
              {user[2]?.bloodGroup}, {user[2]?.name}, {user[2]?.district}{" "}
              {user[2]?.upazila} ({formatDate(user[2]?.timestamp)})
            </p>
          </li>
          <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
            <FaHeart className="text-2xl text-red-500" />{" "}
            <p>
              {user[3]?.bloodGroup}, {user[3]?.name}, {user[3]?.district}{" "}
              {user[3]?.upazila} ({formatDate(user[3]?.timestamp)})
            </p>
          </li>
          <li className="rounded-md bg-white text-black p-4 flex gap-2 border">
            <FaHeart className="text-2xl text-red-500" />{" "}
            <p>
              {user[4]?.bloodGroup}, {user[4]?.name}, {user[4]?.district}{" "}
              {user[4]?.upazila} ({formatDate(user[4]?.timestamp)})
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

CurrentRequest.propTypes = {};

export default CurrentRequest;
