import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { IoSendSharp } from "react-icons/io5";
import useUserInfo from "../../../Hooks/useUserInfo";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import useAllDonationRequest from "../../../Hooks/useAllDonationRequest";
import Spiner from "../../../Components/Spiner";
import useAllnRequest from "../../../Hooks/useAllRequest";
import useAllRequest from "../../../Hooks/useAllRequest";

const DonationRequest = () => {
  const [userInfo] = useUserInfo();
  const [alldonationrequest, refetch, isLoading] = useAllRequest();
  console.log("requested data: ", alldonationrequest);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllRequests, setShowAllRequests] = useState(false);

  useEffect(() => {
    fetch("/districts.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((response) => response.json())
      .then((data) => setUpazilas(data))
      .catch((error) => console.error("Error fetching upazilas:", error));
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const handleUpdateStatus = async (requestId, newStatus) => {
    const donorData = {
      donorName: newStatus === "done" ? userInfo?.name : "",
      donorEmail: newStatus === "done" ? userInfo?.email : "",
      status: newStatus,
    };
    try {
      const result = await axiosSecure.patch(
        `/donationRequest/${requestId}`,
        donorData
      );

      if (result.data.modifiedCount > 0) {
        newStatus === "done"
          ? Swal.fire({
              title: "Done!",
              icon: "success",
              text: "Thanks to donate blood",
              confirmButtonText: "Ok!",
            })
          : Swal.fire({
              title: "Canceled!",
              icon: "success",
              text: "Blood donation status set to Canceled!",
              confirmButtonText: "Ok!",
            });
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
        axiosSecure.delete(`/donationRequest/${id}`).then((res) => {
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
  if (isLoading) return <Spiner />;

  return (
    <div>
      <div className="flex mx-auto pt-12 text-center text-xl lg:text-3xl font-bold text-black pb-2 w-fit px-4 border-b-2 border-red-500">
        All Pending Donations Requested By {userInfo?.name}
      </div>
      <div className="overflow-x-auto border border-red-600 overflow-y-auto max-w-[90vw] max-h-[60vh] mx-auto mb-4 my-8 rounded-md">
        {loading ? (
          <Spiner />
        ) : (
          <table className="table">
            <thead className="text-lg bg-red-500 text-white font-semibold border-2 border-red-500">
              <tr>
                <th>Recipient Name</th>
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
            <tbody className="text-sm font-semibold bg-red-500 bg-opacity-20 border-2 border-red-500">
              {alldonationrequest.length > 0 ? (
                alldonationrequest.slice(0, 3).map((request) => (
                  <tr key={request._id} className="border-b-2 border-red-500">
                    <td className="border-r-2 border-red-500">
                      {request.recipientName}
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
                      {request.requesterName}
                    </td>
                    <td className="border-r-2 border-red-500">
                      {request.requesterEmail}
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
                    <td className="border-r-2 border-red-500">
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="py-2 px-4 bg-red-500 text-white rounded-md"
                        id={request._id}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="border-r-2 border-red-500">
                      <button
                        className={`py-2 px-4 ${
                          request.status === "inprogress"
                            ? "bg-green-500 text-white"
                            : "button-disabled"
                        } rounded-md`}
                        onClick={() => handleUpdateStatus(request._id, "done")}
                      >
                        Done
                      </button>
                    </td>
                    <td className="border-r-2 border-red-500">
                      <button
                        className={`py-2 px-4 ${
                          request.status === "inprogress"
                            ? "bg-red-500 text-white"
                            : "button-disabled"
                        } rounded-md`}
                        onClick={() =>
                          handleUpdateStatus(request._id, "canceled")
                        }
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {!isLoading && alldonationrequest.length === 0 && (
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
      <div className="flex justify-center mb-12">
        <Link to="/dashboard/my-donation-requests">
          <button className="bg-red-500 rounded-lg py-2 px-8 text-center text-white font-semibold">
            <div className="flex gap-2 items-center">
              <div>My Donation Requests</div>
              <div>
                <IoSendSharp />
              </div>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DonationRequest;
