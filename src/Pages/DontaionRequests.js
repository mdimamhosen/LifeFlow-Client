import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useUserInfo from "../Hooks/useUserInfo";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import Spiner from "../Components/Spiner";
import { Helmet } from "react-helmet-async";

const DontaionRequests = () => {
  const [userInfo] = useUserInfo();
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const {
    data: alldonationrequest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["alldonationrequest", currentPage, filter, filterStatus],
    queryFn: async () => {
      const { data } = await axiosOpen.get("/alldonationRequest");
      return data;
    },
  });

  const handleRequestsPerPageChange = (e) => {
    setRequestsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const allReqst = alldonationrequest;

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = allReqst.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(allReqst.length / requestsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <Spiner />;

  return (
    <div className="mb-10">
      <Helmet>
        <title>LifeFlow | Donation Requests</title>
      </Helmet>
      <div className="flex mx-auto pt-12 text-center text-xl lg:text-3xl font-bold text-black pb-2 w-fit px-4 border-b-2 border-red-500">
        Donation Request
      </div>

      <div className="overflow-x-auto border border-red-600 overflow-y-auto max-w-[90vw] max-h-[60vh] mx-auto mb-4 my-8 rounded-md">
        {isLoading ? (
          <Spiner />
        ) : (
          <table className="table">
            <thead className="text-lg bg-red-500 text-white font-semibold border-2 border-red-500">
              <tr>
                <th>Requester Name</th>
                <th>Requester Email</th>
                <th>Blood Group</th>
                <th>Date & time</th>
                <th>Hospital Name</th>
                <th>Full Address</th>
                <th>Donor Name</th>
                <th>Donor Email</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Donation Reason</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold bg-red-200 bg-opacity-20 border-2 border-red-500">
              {currentRequests.length > 0 ? (
                currentRequests.map((request) => (
                  <tr key={request._id} className="border-b-2 border-red-500">
                    <td className="border-r-2 border-red-500">
                      {request.requesterName}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.requesterEmail}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.bloodGroup}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.date} at {request.time}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.hospitalName}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.fullAddress}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.recipientName}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.recipientEmail}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.district}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.upazila}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.donationStatus.slice(0, 20)}...
                    </td>
                    <td className="border-r-2 border-red-500">
                      <NavLink
                        to={`/dashboard/RequestedDonationDetails/${request._id}`}
                      >
                        <button
                          className={`py-2 px-4 ${"bg-gray-500 text-white"} rounded-md`}
                          id={request._id}
                        >
                          View
                        </button>
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {!isLoading && allReqst.length === 0 && (
                    <tr>
                      <td
                        colSpan="16"
                        className="text-center h-96 overflow-y-scroll text-2xl lg:text-4xl py-6 capitalize"
                      >
                        No pending donation requests available right now
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`py-2 px-4 mx-1 ${
              currentPage === index + 1
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border border-red-500"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        {currentRequests.length > 0 && (
          <select
            value={requestsPerPage}
            onChange={handleRequestsPerPageChange}
            className="border-2 border-red-300 py-2 px-4 w-40 rounded-md outline-none"
          >
            <option value={3}>3 per page</option>
            <option value={5}>5 per page</option>
            <option value={8}>8 per page</option>
            <option value={10}>10 per page</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default DontaionRequests;
