import Swal from "sweetalert2";
import useUserInfo from "../../../Hooks/useUserInfo";
import { axiosOpen } from "../../../Hooks/useAxiosCommon";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const RequestedDonationDetails = () => {
  const { id } = useParams();
  const {
    data: singledonationrequest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["singledonationrequest", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosOpen.get(`/singledonationrequest/${id}`);
      return res.data;
    },
  });
  console.log(singledonationrequest);
  const [selectedDistrict, setSelectedDistrict] = useState(
    singledonationrequest?.district
  );
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState(
    singledonationrequest?.upazila
  );
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = useUserInfo();

  console.log(singledonationrequest);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    fetch("/districts.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error))
      .finally(() => setLoading(false));

    fetch("/upazilas.json")
      .then((response) => response.json())
      .then((data) => setUpazilas(data))
      .catch((error) => console.error("Error fetching upazilas:", error));
  }, []);
  useEffect(() => {
    setSelectedDistrict(singledonationrequest?.district);
    setSelectedUpazila(singledonationrequest?.upazila);
  }, [isLoading]);

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districts.find(
      (item) => item.id === selectedDistrictId
    );
    setSelectedDistrict(selectedDistrict.name);

    const filtered = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrictId
    );
    const selectedUpazila = upazilas.find((item) => item.id === filtered);

    setFilteredUpazilas(filtered);
  };

  const handleUpazilaChange = (event) => {
    const selectedUpazilaId = event.target.value;
    const selectedUpazila = upazilas.find(
      (item) => item.id === selectedUpazilaId
    );
    setSelectedUpazila(selectedUpazila.name);
  };

  const onSubmit = async (data) => {
    setError(true);
    setLoading(true);

    const donationRequestData = {
      requesterName: data.requesterName,
      requesterEmail: data.requesterEmail,

      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      district: selectedDistrict,
      upazila: selectedUpazila,
      date: data.date,
      time: data.time,
      donationStatus: data.donationStatus,
      status: "pending",
    };

    console.log(donationRequestData);

    await axiosSecure
      .patch(`/donationUpdateRequest/${id}`, donationRequestData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setError(false);
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated Donation Request added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        //   reset();
      })
      .catch((error) => {
        setError(false);
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed To Update Donation Request added!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {" "}
      <div className="div p-2">
        <div className="flex flex-col border-[3px] rounded-lg  container mx-auto px-4 md:px-2 py-4  bg-slate-100 bg-opacity-20">
          <div className="flex justify-center">
            <h1 className="text-3xl text-center font-bold pb-2 border-b-[3px]  px-4 w-fit">
              Edit Donation Request
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* .flex.flex-col.md:flex-row.gap-2.w-full */}
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Requester Name
                  </span>
                </label>
                <input
                  type="text"
                  value={userInfo[0]?.name}
                  placeholder={userInfo[0]?.name}
                  {...register("requesterName")}
                  defaultValue={singledonationrequest.requesterName}
                  name="requesterName"
                  className=" border-2  input input-bordered"
                  readOnly
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Requester Email
                  </span>
                </label>
                <input
                  type="email"
                  value={userInfo[0]?.email}
                  defaultValue={singledonationrequest.requesterEmail}
                  placeholder={userInfo[0]?.email}
                  {...register("requesterEmail")}
                  name="requesterEmail"
                  className=" border-2  input input-bordered"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Hospital Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Hospital Name"
                  className=" border-2  input input-bordered"
                  defaultValue={singledonationrequest.hospitalName}
                  {...register("hospitalName")}
                />
                {errors.hospitalName && (
                  <span className="text-red-500">Hospital Name is</span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Full Address
                  </span>
                </label>
                <input
                  type="text"
                  defaultValue={singledonationrequest.fullAddress}
                  placeholder="Full Address"
                  className=" border-2  input input-bordered"
                  {...register("fullAddress")}
                />
                {errors.fullAddress && (
                  <span className="text-red-500">Full Address is </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Blood Group
                  </span>
                </label>
                <select
                  {...register("bloodGroup")}
                  name="bloodGroup"
                  defaultValue={singledonationrequest.bloodGroup}
                  className="border-2  input input-bordered"
                >
                  <option value="" defaultValue="Select Blood Group">
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {errors.bloodGroup && (
                  <span className="text-red-500">Blood group is </span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Donation Date
                  </span>
                </label>
                <input
                  type="date"
                  defaultValue={singledonationrequest.date}
                  name="date"
                  placeholder="DonationDate"
                  className=" border-2  input input-bordered"
                  {...register("date")}
                />
                {errors.date && (
                  <span className="text-red-500">Donation Date is</span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700 font-semibold">
                    Donation Time
                  </span>
                </label>
                <input
                  type="time"
                  defaultValue={singledonationrequest.time}
                  name="time"
                  placeholder="Donation Time"
                  className=" border-2  input input-bordered"
                  {...register("time")}
                />
                {errors.time && (
                  <span className="text-red-500">Donation Date is</span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="form-control w-full">
                <label
                  htmlFor="district"
                  className="label-text text-gray-700 font-semibold"
                >
                  District
                  <select
                    // seleced={singledonationrequest.district}
                    {...register("district")}
                    onChange={handleDistrictChange}
                    // defaultValue={singledonationrequest.district}
                    value={selectedDistrict}
                    id="district"
                    className="block w-full rounded-md border-2  input input-bordered border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                  >
                    <option value="" disabled>
                      Select District
                    </option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </label>
                {/* {errors.district && (
              <span className="text-red-500">District is </span>
            )} */}
              </div>

              <div className="form-control w-full">
                <label
                  htmlFor="upazila"
                  className="label-text text-gray-700 font-semibold"
                >
                  Upazila
                  <select
                    {...register("upazila")}
                    seleced={singledonationrequest.upazila}
                    id="upazila"
                    onChange={handleUpazilaChange}
                    defaultValue={singledonationrequest.upazila}
                    className="block w-full rounded-md border-2  input input-bordered border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                  >
                    <option className="font-normal" value="" disabled>
                      {singledonationrequest.upazila}
                    </option>
                    {loading ? (
                      <option value="" disabled>
                        Loading upazilas...
                      </option>
                    ) : (
                      filteredUpazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.id}>
                          {upazila.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                {errors.upazila && (
                  <span className="text-red-500">Upazila is </span>
                )}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">
                  Type Blood Donation Request Reason
                </span>
              </label>
              <textarea
                type="text"
                defaultValue={singledonationrequest.donationStatus}
                name="donationStatus"
                placeholder="Please Describe The Reason Of Blood Donation Request"
                className="border-2  input input-bordered overflow-y-auto max-h-[30vh] h-[100px]"
                {...register("donationStatus")}
              />
              {errors.donationStatus && (
                <span className="text-red-500">Donation Status is</span>
              )}
            </div>

            <div className="form-control w-full mt-6">
              <input
                type="submit"
                value={loading ? "Loading..." : "Update Donation Request"}
                className="cursor-pointer bg-red-600 bg-opacity-70 text-white py-2 rounded font-bold text-lg w-full"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestedDonationDetails;
