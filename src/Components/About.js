import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-200">
      <section
        className="py-10 container mx-auto px-4 md:px-0 lg:px-20"
        id="about"
        aria-label="about"
      >
        <div className="flex flex-col lg:flex-row items-center">
          <div className="mb-10 lg:mb-0 lg:mr-10 flex justify-center w-full lg:w-auto">
            <img
              src="https://wh1t3-e4gl3.github.io/project-red-stream/assets/images/about-banner.png"
              loading="lazy"
              alt="about banner"
              className="w-full max-w-md lg:max-w-full rounded-lg"
            />
          </div>
          <div className="lg:flex-1 w-full">
            <p className="text-lg text-gray-600">About Us</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2">
              We Save Lives Together ꨄ︎
            </h2>
            <p className="mt-6 text-gray-700">
              At Red Stream, we unite donors and recipients to ensure timely
              access to life-saving blood transfusions. Our mission is to create
              a seamless and efficient donation experience.
            </p>
            <p className="mt-4 text-gray-700">
              Join our compassionate community dedicated to making a difference.
              Whether you're donating or in need, we're here to support you
              every step of the way.
            </p>
            <NavLink to={"/signup"}>
              <button className="hover:bg-opacity-90 mt-4 transition-all ease-linear duration-200 text-sm md:text-base p-2 bg-black bg-opacity-70 text-white border border-red-500 rounded-md">
                Join As Donor
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
