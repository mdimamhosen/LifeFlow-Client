import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaSave } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useUserInfo from "../Hooks/useUserInfo";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import { axiosSecure } from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
const img_hosting_key = process.env.REACT_APP_IMG_BB;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const UserProfile = () => {
  const [userInfo, refetch, isLoading] = useUserInfo();
  const [isEditable, setIsEditable] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(
    userInfo?.district || ""
  );
  const [selectedUpazila, setSelectedUpazila] = useState(
    userInfo?.upazila || ""
  );
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    bloodGroup: userInfo?.bloodGroup || "",
    district: userInfo?.district || "",
    upazila: userInfo?.upazila || "",
    image: null,
  });
  console.log("UserInfo:", userInfo);
  console.log(formData);
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        email: userInfo.email,
        bloodGroup: userInfo.bloodGroup,
        district: userInfo.district,
        upazila: userInfo.upazila,
        image: userInfo.photo,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    fetch("/districts.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));

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

    // Update formData
    setFormData((prevData) => ({
      ...prevData,
      district: selectedDistrict.name,
    }));
  };

  const handleUpazilaChange = (event) => {
    const selectedUpazilaId = event.target.value;
    const selectedUpazila = upazilas.find(
      (item) => item.id === selectedUpazilaId
    );

    setSelectedUpazila(selectedUpazila.name);

    // Update formData
    setFormData((prevData) => ({
      ...prevData,
      upazila: selectedUpazila.name,
    }));
  };

  const onSubmit = async (data) => {
    console.log("Form data:", formData);

    const form = new FormData();

    if (formData.image !== undefined) {
      form.append("image", formData.image);
      const res = await axiosOpen.post(img_hosting_api, form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const imageUrl = res.data.data.display_url;
      console.log("Image URL:", imageUrl);

      const updatedData = {
        ...formData,
        image: imageUrl,
      };
      console.log("Updated Data:", updatedData);
      await axiosSecure
        .patch("/user", updatedData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          toast.success("User data updated successfully");
          refetch();
        })
        .catch((error) => {
          toast.error("Error updating user data");
          console.error("Error updating user data:", error);
        });
    } else {
      const updatedData = {
        ...formData,
      };
      await axiosSecure
        .patch("/user", updatedData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("User data updated successfully:", res.data);
          refetch();
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    }

    setIsEditable(false);
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
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="font-bold text-red-500">Email:</label>
              <input
                type="email"
                {...register("email")}
                className="form-control border-2 border-red-500 w-full p-2 rounded-md"
                readOnly
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label className="font-bold text-red-500">Blood Group:</label>
              <select
                {...register("bloodGroup")}
                className="form-control border-2 border-red-500 w-full p-2 rounded-md"
                disabled={!isEditable}
                value={formData.bloodGroup}
                onChange={(e) =>
                  setFormData({ ...formData, bloodGroup: e.target.value })
                }
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
                className="hidden text-sm font-medium text-gray-700"
              >
                District
                <select
                  {...register("district")}
                  onChange={handleDistrictChange}
                  id="district"
                  disabled={!isEditable}
                  value={formData.district}
                  defaultValue={formData?.district}
                  //   onChange={(e) =>
                  //     setFormData({ ...formData, district: e.target.value })
                  //   }
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                >
                  <option value="" disabled>
                    {formData?.district || ""}
                  </option>{" "}
                  {isLoading ? (
                    <option value="" disabled>
                      isLoading districts...
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
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
                <select
                  {...register("district")}
                  id="district"
                  disabled={!isEditable}
                  value={formData.district}
                  defaultValue={formData?.district}
                  //   onChange={(e) =>
                  //     setFormData({ ...formData, upazila: e.target.value })
                  //   }
                  onChange={handleDistrictChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                >
                  <option value="" disabled>
                    {userInfo?.district || ""}
                  </option>
                  {isLoading ? (
                    <option value="" disabled>
                      isLoading upazilas...
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
              {errors.upazila && (
                <span className="text-red-500">Upazila is required</span>
              )}
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
                  value={formData.upazila}
                  defaultValue={formData?.upazila}
                  //   onChange={(e) =>
                  //     setFormData({ ...formData, upazila: e.target.value })
                  //   }
                  onChange={handleUpazilaChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                >
                  <option value="" disabled>
                    {userInfo?.upazila || ""}
                  </option>
                  {isLoading ? (
                    <option value="" disabled>
                      isLoading upazilas...
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
                  //   {...register("image")}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
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
                backgroundImage: `url(${userInfo?.image})`,
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
