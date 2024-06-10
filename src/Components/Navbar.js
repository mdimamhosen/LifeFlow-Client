import React, { useState } from "react";
import { FiLogIn, FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";
import avatar from "../Assets/765-default-avatar.png";
import useAuth from "../Hooks/useAuth";
import useUserInfo from "../Hooks/useUserInfo";

export default function Navbar() {
  const { user, logOut, loading } = useAuth();
  const [userInfo, refetch] = useUserInfo();

  const photoUrl = user?.photoUrl || avatar || "";

  const [isSideMenuOpen, setMenu] = useState(false);
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  const navlinks = [
    { label: "Home", link: "/" },
    { label: "Donation Requests", link: "/donation-requests" },
    { label: "Blogs", link: "/blogs" },
    { label: "Contact", link: "/contact" },
  ];

  const handleSignOut = async () => {
    await logOut();
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const handleNavLinkClick = () => {
    if (isSideMenuOpen) {
      setMenu(false);
    }
  };

  return (
    <main
      className={
        theme === "light"
          ? "sticky top-0 z-50 bg-white text-black"
          : "sticky top-0 z-50 bg-gray-900 text-white"
      }
    >
      <nav className="flex justify-between container mx-auto items-center py-4 px-2 md:px-3 lg:px-0">
        <section className="flex items-center gap-2">
          <FiMenu
            onClick={() => setMenu(true)}
            className="text-xl cursor-pointer lg:hidden"
          />
          <NavLink
            to="/"
            className="lg:text-4xl text-xl font-bold text-red-600"
          >
            LifeFlow
          </NavLink>
        </section>
        <section className="hidden lg:flex items-center gap-4">
          {navlinks.map((d, i) => (
            <NavLink
              key={i}
              className={({ isActive }) =>
                isActive
                  ? "text-center text-red-600 underline transition-all duration-300 ease-linear"
                  : "text-center"
              }
              to={d.link}
              onClick={handleNavLinkClick}
            >
              {d.label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-center text-red-600 underline transition-all duration-300 ease-linear"
                  : "text-center"
              }
              to="/giveDonation"
              onClick={handleNavLinkClick}
            >
              Donate Us
            </NavLink>
          )}
        </section>

        <div
          className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transition-all z-50 ${
            isSideMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <section
            className={
              theme === "light"
                ? "text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-4 z-50 w-full flex"
                : "text-white bg-[#12212a] flex-col absolute left-0 top-0 h-screen p-8 gap-4 z-50 w-full flex"
            }
          >
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer text-[#ea3c3c]"
            />
            {navlinks.map((d, i) => (
              <>
                {" "}
                <NavLink
                  key={i}
                  className="border  bg-slate-50 border-double border-[#ae6b6b] px-1 py-2 rounded-lg text-center text-black pb-1  hover:border-b-[1px] hover:border-red-500 duration-300"
                  to={d.link}
                  onClick={handleNavLinkClick}
                >
                  {d.label}
                </NavLink>
              </>
            ))}

            {user && (
              <NavLink
                className="border bg-slate-50 border-double border-[#ae6b6b] px-1 py-2 rounded-lg text-center text-black pb-1  hover:border-b-[1px] hover:border-red-500 duration-300"
                to="/giveDonation"
                onClick={handleNavLinkClick}
              >
                Donate Us
              </NavLink>
            )}
          </section>
        </div>

        <section className="flex items-center gap-4">
          {loading && !user ? (
            <div className="text-xs"></div>
          ) : (
            <>
              {user && (
                <>
                  <div position="top" trigger="mouseenter">
                    <div className="dropdown dropdown-end z-30">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            alt="User Avatar"
                            src={user?.reloadUserInfo?.photoUrl || avatar}
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <NavLink
                            to="/"
                            className={({ isActive }) =>
                              isActive
                                ? "justify-between font-bold"
                                : "justify-between font-bold"
                            }
                          >
                            Home
                          </NavLink>
                          <NavLink
                            className="font-bold"
                            to={
                              userInfo?.role === "Volunteer"
                                ? "/dashboard/volunteerHome"
                                : userInfo?.role === "Admin"
                                ? "/dashboard/adminHome"
                                : userInfo?.role === "Donor"
                                ? "/dashboard/donorHome"
                                : "/dashboard"
                            }
                          >
                            DASHBOARD
                          </NavLink>
                        </li>
                        <li>
                          <button
                            onClick={handleSignOut}
                            className="font-bold rounded outline-none border-0       "
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
              {!user && (
                <NavLink
                  className="text-black  px-1 hover:border-b-[1px] hover:border-b-red-500 duration-500 flex gap-2 sm:text-sm lg:text-sm    text-center items-center justify-center "
                  to="/login"
                >
                  <FiLogIn className=" text-sm lg:text-lg text-red-500" />{" "}
                  <p>LOGIN</p>
                </NavLink>
              )}
            </>
          )}
        </section>
      </nav>
      <hr />
    </main>
  );
}
//
