import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import toast, { ToastBar } from "react-hot-toast";
import { set } from "react-hook-form";

const Login = () => {
  const { loading, signIn, setLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errors, setErrors] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      console.log("Logged in successfully!", result?.user);
      Swal.fire({
        title: "Logged In!",
        text: `${
          result?.user?.displayName ? result?.user?.displayName : "User"
        } logged in successfully!`,
        imageUrl: result?.user?.photoURL
          ? result?.user?.photoURL || result?.user?.photoURL
          : "https://i.ibb.co/qnT81gF/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok!",
      });
      setLoading(false);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message.split(" ").slice(1).join(" "));

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50 px-2">
      <Helmet>
        <title>{`LifeFlow | Log In`}</title>
      </Helmet>
      <NavLink
        to="/"
        className="fixed text-xs md:text-base  top-0 inset-x-0 flex justify-center items-center gap-2 py-2 text-white bg-red-600"
      >
        <IoIosArrowRoundBack size={"20px"} />
        <h1 className="  font-semibold text-center">
          Back to the LifeFlow Home Page
        </h1>
      </NavLink>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md  ">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Welcome You Again
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-bold ${
                emailFocused || email ? "text-red-600" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none p-2 transition-all ${
                emailFocused || email ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              value={email}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className={`block text-sm font-bold ${
                passwordFocused || password ? "text-red-600" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:outline-none transition-all ${
                  passwordFocused || password
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
                value={password}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </button>
            </div>
          </div>
          {errors && <p className="text-red-600 mb-4">{errors}</p>}{" "}
          {/* Display errors if any */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-red-600 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
