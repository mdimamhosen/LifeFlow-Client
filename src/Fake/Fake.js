import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaSave } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const UserProfile = ({ userInfo, refetch }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [loading, setLoading] = useState(true);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("bloodGroup", data.bloodGroup);
    formData.append("district", selectedDistrict);
    formData.append("upazila", selectedUpazila);
    formData.append("image", data.image[0]);
    console.log("Form data:", data);

    setIsEditable(false);
    refetch();
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
    reset();
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districts.find(
      (item) => item.id === selectedDistrictId
    );

    setSelectedDistrict(selectedDistrict.name);

    const filtered = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrictId
    );
    setFilteredUpazilas(filtered);
  };

  const handleUpazilaChange = (event) => {
    const selectedUpazilaId = event.target.value;
    const selectedUpazila = upazilas.find(
      (item) => item.id === selectedUpazilaId
    );

    setSelectedUpazila(selectedUpazila.name);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div className="flex justify-center w-full">
        <h1 className="text-3xl font-bold md:px-4 border-b-2 border-red-500 w-fit mb-8">
          {userInfo?.role} Profile
        </h1>
      </div>
      <div className="rounded-lg border-2 border-red-500 p-6 md:p-12 w-full max-w-5xl flex flex-col lg:flex-row justify-center gap-12 bg-slate-200 bg-opacity-20">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-2xl font-semibold">
                Profile Information
              </h2>
              {isEditable ? (
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaSave className="mr-1" /> Save
                  </button>
                </div>
              ) : (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={handleEditClick}
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
              )}
            </div>
            <div className="form-group">
              <label className="font-bold text-red-500">Name:</label>
              <input
                type="text"
                {...register("name")}
                className="form-control border-2 border-red-500 w-full p-2 rounded-md"
                readOnly={!isEditable}
                defaultValue={userInfo?.name || ""}
              />
            </div>
            <div className="form-group">
              <label className="font-bold text-red-500">Email:</label>
              <input
                type="email"
                {...register("email")}
                className="form-control border-2 border-red-500 w-full p-2 rounded-md"
                readOnly
                defaultValue={userInfo?.email || ""}
              />
            </div>
            <div className="form-group">
              <label className="font-bold text-red-500">Blood Group:</label>
              <select
                {...register("bloodGroup")}
                className="form-control border-2 border-red-500 w-full p-2 rounded-md"
                disabled={!isEditable}
                defaultValue={userInfo?.bloodGroup || ""}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
                <select
                  {...register("district")}
                  onChange={handleDistrictChange}
                  id="district"
                  disabled={!isEditable}
                  defaultValue={userInfo?.district || ""}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                >
                  <option value="" disabled>
                    {userInfo?.district || ""}
                  </option>{" "}
                  {loading ? (
                    <option value="" disabled>
                      Loading districts...
                    </option>
                  ) : (
                    districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))
                  )}
                </select>
              </label>
              {/* {errors.district && (
                <span className="text-red-500">District is required</span>
              )} */}
            </div>

            <div>
              <label
                htmlFor="upazila"
                className="block text-sm font-medium text-gray-700"
              >
                Upazila
                <select
                  {...register("upazila")}
                  id="upazila"
                  disabled={!isEditable}
                  defaultValue={userInfo?.upazila || ""}
                  onChange={handleUpazilaChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                >
                  <option value="" disabled>
                    {userInfo?.upazila || ""}
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
                <span className="text-red-500">Upazila is required</span>
              )}
            </div>
            {isEditable && (
              <div className="form-group">
                <label
                  htmlFor="image"
                  className="block text-md font-bold text-red-600"
                >
                  Change Profile Image
                </label>
                <input
                  {...register("image")}
                  type="file"
                  id="image"
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                />
              </div>
            )}
          </form>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-2">
          <div id="imageDiv" className="flex flex-col items-center">
            <div
              className="rounded-lg border-2 bg-white border-red-500 w-64 h-64 lg:w-80 lg:h-80"
              style={{
                backgroundImage: `url(${userInfo?.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
