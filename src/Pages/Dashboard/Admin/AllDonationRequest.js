import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { IoSendSharp } from "react-icons/io5";
import useUserInfo from "../../../Hooks/useUserInfo";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import Spiner from "../../../Components/Spiner";
import { useQuery } from "@tanstack/react-query";

const AllDonationRequest = () => {
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
      const { data } = await axiosSecure.get("/alldonationRequest", {
        params: { page: currentPage, filter, status: filterStatus },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return data;
    },
  });

  const handleUpdateStatus = async (requestId, newStatus) => {
    const donorData = {
      name:
        newStatus === "done" || newStatus === "in progress"
          ? userInfo?.name
          : "",
      email:
        newStatus === "done" || newStatus === "in progress"
          ? userInfo?.email
          : "",
      status: newStatus,
    };
    console.log(newStatus);
    try {
      const result = await axiosSecure.patch(
        `/donationRequest/${requestId}`,
        donorData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(result);
      if (result.data.modifiedCount > 0) {
        if (newStatus === "done") {
          Swal.fire({
            title: "Done!",
            icon: "success",
            text: "Thanks for donating blood",
            confirmButtonText: "Ok!",
          });
        } else if (newStatus === "canceled") {
          Swal.fire({
            title: "Canceled!",
            icon: "success",
            text: "Blood donation status set to Canceled!",
            confirmButtonText: "Ok!",
          });
        } else {
          Swal.fire({
            title: "Set to inprogress!",
            icon: "success",
            text: "Blood donation status set to in-progress!",
            confirmButtonText: "Ok!",
          });
        }

        refetch();
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Please update some information",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error confirming donation:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while confirming the donation",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donationRequest/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    console.log(e.target.value);
    setCurrentPage(1);
  };

  const filteredRequests = alldonationrequest.filter((request) =>
    filterStatus === "all" ? true : request.status === filterStatus
  );

  const handleRequestsPerPageChange = (e) => {
    setRequestsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <Spiner />;

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(alldonationrequest.length / requestsPerPage);

  return (
    <div>
      <div className="flex mx-auto pt-12 text-center text-xl lg:text-3xl font-bold text-black pb-2 w-fit px-4 border-b-2 border-red-500">
        All Donation Request
      </div>
      <div className="filter-buttons flex gap-4 mx-auto justify-center bg-red-500 w-fit px-8 py-2 rounded-lg mb-8 w-[95vw] mt-6">
        <label htmlFor="statusFilter" className="text-white font-semibold">
          Filter by Status:
        </label>
        <select
          className="rounded-lg"
          id="statusFilter"
          onChange={handleFilterChange}
          value={filterStatus}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
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
                <th>Edit</th>
                <th>Delete</th>
                <th>Confirm</th>
                <th>Cancel</th>
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
                          disabled={userInfo?.status !== "active"}
                          className={`py-2 px-4 ${
                            userInfo?.status !== "active"
                              ? "button-disabled cursor-not-allowed bg-gray-500 text-white"
                              : "bg-gray-500 text-white"
                          } rounded-md`}
                          id={request._id}
                        >
                          View
                        </button>
                      </NavLink>
                    </td>
                    {
                      <td className="border-r-2 border-red-500">
                        <NavLink
                          to={`/dashboard/EditDonationRequest/${request._id}`}
                        >
                          <button
                            className="py-2 px-4 bg-yellow-500 text-white rounded-md"
                            id={request._id}
                          >
                            Edit
                          </button>
                        </NavLink>
                      </td>
                    }
                    {
                      <td className="border-r-2 border-red-500">
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="py-2 px-4 bg-red-500 text-white rounded-md"
                          id={request._id}
                        >
                          Delete
                        </button>
                      </td>
                    }
                    {
                      <td className="border-r-2 border-red-500">
                        {request?.status === "in progress" && (
                          <button
                            className="py-2 px-4 bg-green-500 text-white rounded-md"
                            onClick={() =>
                              handleUpdateStatus(request._id, "done")
                            }
                          >
                            Done
                          </button>
                        )}
                      </td>
                    }
                    {
                      <td className="border-r-2 border-red-500 ">
                        {request?.status === "in progress" && (
                          <button
                            className="py-2 px-4 bg-black text-white rounded-md"
                            onClick={() =>
                              handleUpdateStatus(request._id, "canceled")
                            }
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    }
                  </tr>
                ))
              ) : (
                <>
                  {!isLoading && currentRequests.length === 0 && (
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
      </div>
    </div>
  );
};

export default AllDonationRequest;
