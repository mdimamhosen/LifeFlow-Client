import { useEffect, useState } from "react";

import useUserInfo from "../Hooks/useUserInfo";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import useAllRequest from "../Hooks/useAllRequest";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { IoSendSharp } from "react-icons/io5";
import { axiosSecure } from "../Hooks/useAxiosSecure";
import Spiner from "./Spiner";
const DonationRequest = () => {
  const userInfo = useUserInfo();

  const [alldonationrequest, refetch, isLoading] = useAllRequest();
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
      <div className="flex px-2 mx-auto pt-12 text-center text-xl lg:text-3xl font-bold text-black pb-2 w-fit px-4 border-b-2 border-red-500">
        All Donations Requested and Completed Till{" "}
        {new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
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
              </tr>
            </thead>
            <tbody className="text-sm font-semibold bg-red-500 bg-opacity-20 border-2 border-red-500">
              {alldonationrequest.length > 0 ? (
                alldonationrequest.map((request) => (
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
                      {request.donationStatus}
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
    </div>
  );
};

export default DonationRequest;
