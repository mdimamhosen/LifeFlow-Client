import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import Spiner from "../../../Components/Spiner";
import { axiosOpen } from "../../../Hooks/useAxiosCommon";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import useUserInfo from "../../../Hooks/useUserInfo";

const DonationDetails = () => {
  const [userInfo] = useUserInfo();
  const { id } = useParams();
  const modalRef = useRef(null);

  const {
    data: singledonationrequest = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singledonationrequest", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosOpen.get(`/singledonationrequest/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;
    const name = userInfo?.name;
    const email = userInfo?.email;
    console.log(name, email);
    try {
      const donorData = {
        recipientName: name,
        recipientEmail: email,
        status: "in progress",
      };
      const result = await axiosSecure.patch(
        `/donationRequest/${singledonationrequest?._id}`,
        donorData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.modifiedCount > 0) {
        Swal.fire({
          title: "Done!",
          icon: "success",
          text: "Thanks to donate blood",
          confirmButtonText: "Ok!",
        });
      }
      if (modalRef.current) {
        modalRef.current.close();
      }
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        icon: "error",
        text: "Something went wrong",
        confirmButtonText: "Ok!",
      });
      if (modalRef.current) {
        modalRef.current.close();
      }
      console.error("Submission error:", error);
    }
  };

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-bold mb-4 text-red-600 text-center border-b-2 w-fit border-red-600">
          Donation Request Details
        </h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Requester Name</label>
            <input
              type="text"
              value={singledonationrequest.requesterName || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Requester Email</label>
            <input
              type="text"
              value={singledonationrequest.requesterEmail || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Recipient Name</label>
            <input
              type="text"
              value={singledonationrequest.recipientName || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Recipient Email</label>
            <input
              type="text"
              value={singledonationrequest.recipientEmail || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Hospital Name</label>
            <input
              type="text"
              value={singledonationrequest.hospitalName || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Full Address</label>
            <input
              type="text"
              value={singledonationrequest.fullAddress || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Blood Group</label>
            <input
              type="text"
              value={singledonationrequest.bloodGroup || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">District</label>
            <input
              type="text"
              value={singledonationrequest.district || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Upazila</label>
            <input
              type="text"
              value={singledonationrequest.upazila || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Date</label>
            <input
              type="date"
              value={singledonationrequest.date || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Time</label>
            <input
              type="time"
              value={singledonationrequest.time || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div className=" ">
            <label className="block font-semibold mb-2">Donation Reason</label>
            <input
              type="text"
              value={singledonationrequest.donationStatus || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
          </div>
          <div className="md:col-span-2 flex justify-start mt-4">
            <button
              onClick={() => modalRef.current.showModal()}
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
            >
              Donate
            </button>
          </div>
        </div>
        <dialog
          ref={modalRef}
          id="my_modal_5"
          className="modal  sm:modal-middle"
        >
          <div className="bg-white rounded-xl px-10 py-4">
            <div className="modal-action  ">
              <div method="dialog     w-[100%]  ">
                <form onSubmit={handleSubmit} className="">
                  {" "}
                  <h3 className="font-bold text-lg">Enter Your Information</h3>
                  <div className="flex flex-col my-6 item-center gap-2">
                    <div>
                      <label
                        className="block text-base font-bold "
                        htmlFor="recipientName"
                      >
                        Donor Name
                      </label>
                      <input
                        type="text"
                        value={userInfo?.name}
                        readOnly
                        defaultValue={userInfo?.name}
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        name="recipientName"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="recipientName"
                        className="block text-base font-bold "
                      >
                        Donor Email
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        type="email"
                        name="recipientEmail"
                        value={userInfo?.email}
                        defaultValue={userInfo?.email}
                        readOnly
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="flex  gap-3  font-bold  justify-between item-center">
                    <button className="p-2 border bg-green-200 rounded-lg">
                      Confirm
                    </button>
                    <button
                      className="p-2 border bg-red-200 rounded-lg"
                      type="button"
                      onClick={() => modalRef.current.close()}
                    >
                      Cancel{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DonationDetails;
