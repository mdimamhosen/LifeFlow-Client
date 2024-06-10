// import PropTypes from 'prop-types';
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineContentPaste } from "react-icons/md";
import { MdKeyboardReturn } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { IoCreateSharp } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import useUserInfo from "../Hooks/useUserInfo";
import { Helmet } from "react-helmet-async";

const DashBoard = () => {
  const [userInfo, refetch] = useUserInfo();
  refetch();
  return (
    <div>
      <Helmet>
        <title>LifeFlow || Dashboard</title>
      </Helmet>
      <div className="drawer z-20">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn bg-[transparent] border-none shadow-none hover:bg-[transparent] drawer-button"
          >
            <GiHamburgerMenu className="text-4xl text-red-500" />
          </label>
          <Outlet></Outlet>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="z-20 menu p-4 w-80 min-h-full bg-red-500 bg-opacity-90 drop-shadow-lg text-white pt-8">
            <div className="pl-4">
              <div className="flex flex-row gap-2   items-center drop-shadow-lg mb-4">
                <NavLink to="/" className="text-white text-3xl   font-bold">
                  LifeFlow
                </NavLink>
              </div>
              <h1 className="text-white font-bold text-xl   mb-6">
                Welcome {userInfo?.name}
              </h1>
            </div>
            {/* <===================Admin=================> */}

            {userInfo?.role === "Admin" && (
              <>
                <NavLink
                  to="/dashboard/adminHome"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <FaHome className="text-base 2ext-white " />
                    </div>{" "}
                    <p>Admin Home</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/dashboard/adminProfile"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <CgProfile className="text-base text-white " />
                    </div>{" "}
                    <p>Admin Profile</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/dashboard/all-users"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <FaUsers className="text-base text-white " />
                    </div>{" "}
                    <p>All Users</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <BiSolidDonateBlood className="text-base text-white " />
                    </div>{" "}
                    <p>All Donation Requests</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/dashboard/content-management"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <MdOutlineContentPaste className="text-base text-white " />
                    </div>{" "}
                    <p>Content Management</p>
                  </li>
                </NavLink>
              </>
            )}

            {/* <===================Volunteer=================> */}

            {userInfo?.role === "Volunteer" && (
              <>
                <NavLink
                  to="/dashboard/volunteerHome"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <FaHome className="text-base 2ext-white " />
                    </div>{" "}
                    <p>Volunteer Home</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/dashboard/volunteerProfile"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <CgProfile className="text-base text-white " />
                    </div>{" "}
                    <p>Volunteer Profile</p>
                  </li>
                </NavLink>

                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <BiSolidDonateBlood className="text-base text-white " />
                    </div>{" "}
                    <p>All Donation Requests</p>
                  </li>
                </NavLink>
                <NavLink
                  to="/dashboard/content-management"
                  className="text-white text-md font-bold"
                >
                  <li className="flex flex-row  items-center">
                    <div>
                      <MdOutlineContentPaste className="text-base text-white " />
                    </div>{" "}
                    <p>Content Management</p>
                  </li>
                </NavLink>
              </>
            )}

            {/* <===================Donor=================> */}

            {userInfo?.role === "Donor" && (
              <div className="flex flex-col gap-3">
                <li className=" ">
                  <NavLink
                    to="/dashboard/donorHome"
                    className="text-white text-md font-bold"
                  >
                    <duv className="flex gap-2 items-center">
                      <div>
                        <FaHome className="text-base 2ext-white " />
                      </div>
                      <p>Donor Home</p>
                    </duv>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/donorProfile"
                    className="text-white text-md font-bold"
                  >
                    <div className="flex gap-2 items-center">
                      <CgProfile className="text-base text-white " />{" "}
                      <p>Donor Profile</p>
                    </div>{" "}
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink
                    to="/dashboard/create-donation-request"
                    className="text-white text-md font-bold"
                  >
                    <div>
                      <IoCreateSharp className="text-base text-white " />
                    </div>{" "}
                    <p>Create Request To Donate</p>
                  </NavLink>{" "}
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-donation-requests"
                    className="text-white text-md font-bold hover:bg-opacity-90  "
                  >
                    <div>
                      <BiSolidDonateBlood className="text-base text-white " />
                    </div>{" "}
                    <p>My Donation Requests</p>
                  </NavLink>
                </li>
              </div>
            )}
            <NavLink
              to="/"
              className="hover:bg-opacity-90 px-4 absolute bottom-4 text-center inset-x-0 transition-all ease-linear duration-200   text-sm md:text-base  p-2 bg-black bg-opacity-70 text-white border border-red-500 rounded-md"
            >
              <li className="flex flex-row  justify-center items-center">
                <div>
                  <MdKeyboardReturn className="text-base text-white  " />
                </div>{" "}
                <p>Return to Home</p>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

DashBoard.propTypes = {};

export default DashBoard;
