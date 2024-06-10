import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import searchGif from "../Assets/searching gif.gif";
import { toast } from "react-hot-toast";
import { axiosOpen } from "../Hooks/useAxiosCommon";
import Spiner from "../Components/Spiner";
import { NavLink } from "react-router-dom";

const Search = () => {
  const [searching, setSearching] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedUpazilaId, setSelectedUpazila] = useState("");
  const [filteredUpazila, setFilteredUpazilas] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [currentRequests, setCurrentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data))
      .catch((error) => console.error("Error fetching upazilas:", error));
  }, []);

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrictId(district);
    const filteredUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === district
    );
    setFilteredUpazilas(filteredUpazilas);
  };

  const handleUpazilaChange = (e) => {
    setSelectedUpazila(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    if (!bloodGroup || !selectedDistrictId || !selectedUpazilaId) {
      toast.error("Please fill in all required fields", {
        position: "top-center",
      });
      setSearching(false);
      return;
    }
    const districtName = districts.find(
      (district) => district.id === selectedDistrictId
    ).name;
    const upazilaName = upazilas.find(
      (upazila) => upazila.id === selectedUpazilaId
    ).name;
    const formData = {
      bloodGroup,
      district: districtName,
      upazila: upazilaName,
    };
    console.log("Form data:", formData);

    setIsLoading(true);
    try {
      const res = await axiosOpen.get("/donors/search", {
        params: formData,
      });
      setSearchResult(res.data);
      setCurrentRequests(res.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setSearching(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 px-2">
      <Helmet>
        <title>{`LifeFlow | Search Page`}</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 w-fit text-center mx-auto">
        Search Donors
      </h1>
      <div className="p-2 border-2 lg:w-[80%] mx-auto py-4 border-opacity-20 rounded-lg bg-opacity-10 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="font-bold block text-gray-700">Blood Group</label>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm outline-none py-2 bg-slate-100"
              value={bloodGroup}
              onChange={handleBloodGroupChange}
              required
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
          </div>

          <div>
            <label className="font-bold block text-gray-700">District</label>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm outline-none py-2 bg-slate-100"
              value={selectedDistrictId}
              onChange={handleDistrictChange}
              required
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
          </div>

          <div>
            <label className="font-bold block text-gray-700">Upazila</label>
            <select
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm outline-none py-2 bg-slate-100"
              value={selectedUpazilaId}
              onChange={handleUpazilaChange}
              required
            >
              <option value="" disabled>
                Select Upazila
              </option>
              {filteredUpazila.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <button
              type="submit"
              onClick={handleSearch}
              className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
            >
              Search
              <FaSearch className="ml-2" />
            </button>
          </div>
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
                        {request.recipientName || "N/A"}
                      </td>
                      <td className="border-r-2 border-red-500">
                        {request.recipientEmail || "N/A"}
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
                      <td>
                        <NavLink
                          to={`/donation-requests/${request._id}`}
                          className="bg-blue-500 p-2 rounded-md text-white hover:underline"
                        >
                          View
                        </NavLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
