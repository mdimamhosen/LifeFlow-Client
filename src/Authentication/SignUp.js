import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { Toaster, toast } from "react-hot-toast";

const img_hosting_key = process.env.REACT_APP_IMG_BB;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const SignUp = () => {
  const { updateUserProfile, createUser, logOut } = useAuth();
  const axiosPublic = useAxiosCommon();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const from = location.state?.from?.pathname || "/";
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
    setError(null);
    setLoading(true);

    const status = "active";
    const imageFile = data.image[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    console.log(imageFile);

    try {
      const res = await axiosPublic.post(img_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const imageUrl = res.data.data.display_url;
      console.log("Image URL:", imageUrl);
      console.log("User Data:", data);

      const userCredential = await createUser(data.email, data.password);
      const loggedUser = userCredential.user;

      await updateUserProfile(data.name, imageUrl);

      localStorage.setItem("token", userCredential.token);

      const userData = {
        name: data.name,
        email: data.email,
        photo: imageUrl,
        status,
        role: "Donor",
        bloodGroup: data.bloodGroup,
        district: selectedDistrict,
        upazila: selectedUpazila,
      };
      console.log("User Data:", userData);

      const response = await axiosPublic.put("/user", userData);
      console.log("User Data Response:", response.data);

      if (response.data.upsertedCount) {
        Swal.fire({
          title: "Profile Created!",
          text: `${"User"} Profile created successfully! Please login to continue.`,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Profile Image",
          confirmButtonText: "Ok!",
        });
        reset();
        toast.success("Profile created successfully!");
        await logOut();
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>{`LifeFlow | Sign Up`}</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center px-2 md:px-0">
        <div className="w-full max-w-md bg-white px-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center border-b-2 py-2 px-8">
            Register Now
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register("name", { required: true })}
                      id="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                    />
                  </label>
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", { required: true })}
                      id="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                    />
                  </label>
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", { required: true })}
                      id="password"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                    />
                  </label>
                  {errors.password && (
                    <span className="text-red-500">Password is required</span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      {...register("confirmPassword", { required: true })}
                      id="confirmPassword"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                    />
                  </label>
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      Confirm Password is required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-full">
                <div className="w-full">
                  <label
                    htmlFor="bloodGroup"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Blood Group
                    <select
                      {...register("bloodGroup", { required: true })}
                      id="bloodGroup"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                    >
                      <option value="" disabled>
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
                  </label>
                  {errors.bloodGroup && (
                    <span className="text-red-500">
                      Blood group is required
                    </span>
                  )}
                </div>
                {/* <div className="w-full">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Role
                    <select
                      {...register("role", { required: true })}
                      id="role"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="Donor">Donor</option>
                      <option value="Volunteer">Volunteer</option>
                    </select>
                  </label>
                  {errors.role && (
                    <span className="text-red-500">Role is required</span>
                  )}
                </div> */}
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700"
                >
                  District
                  <select
                    {...register("district", { required: true })}
                    onChange={handleDistrictChange}
                    value={selectedDistrict}
                    id="district"
                    className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                  >
                    <option value="" disabled>
                      Select District
                    </option>
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
                    {...register("upazila", { required: true })}
                    id="upazila"
                    onChange={handleUpazilaChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                  >
                    <option value="" disabled>
                      Select Upazila
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

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Profile Image
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    id="image"
                    className="block w-full rounded-md border-gray-300 shadow-sm p-2 bg-slate-50 outline-none transition-all"
                  />
                </label>
                {errors.image && (
                  <span className="text-red-500">
                    Profile image is required
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50"
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </div>
          </form>
          <p className="text-center py-3 flex justify-center items-center gap-1">
            <span className="text-gray-700">Already have an account?</span>
            <Link to="/login" className="text-red-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
