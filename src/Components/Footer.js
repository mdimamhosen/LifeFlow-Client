import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoTimeOutline,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoAddOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#00173D] text-white py-6">
      <div className="  px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid gap-8  grid-cols-2 lg:grid-cols-4">
          <div>
            <NavLink to="/" className="text-white text-2xl font-bold">
              LifeFlow
            </NavLink>
            <p className="my-4 leading-relaxed  text-xs md:text-sm">
              We are passionate about connecting blood donors with recipients
              and bridging the gap in the healthcare industry. We strive to
              create a community that fosters empathy, support, and solidarity
              among individuals who are committed to making a difference.
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-[#1A82E0] text-white p-2 rounded-full text-xl">
                <IoTimeOutline />
              </div>
              <span className="leading-relaxed  text-xs md:text-sm">
                24 X 7
                <br />
                365 Days
              </span>
            </div>
          </div>
          <ul>
            <li className="text-white text-lg font-bold mb-2">Other Links</li>
            {[
              "Home",
              "Find donor",
              "About us",
              "Blog",
              "Contact",
              "Login / Register",
            ].map((link, index) => (
              <li
                key={index}
                className="flex items-center gap-2 py-2 transition-colors hover:text-[#1A82E0]"
              >
                <IoAddOutline className="text-[#1A82E0]" />
                <NavLink
                  to={`/${link.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-white  text-xs md:text-sm"
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul>
            <li className="text-white text-lg font-bold mb-2">Our Services</li>
            {[
              "Blood Donation",
              "Plasma Donation",
              "Platelet Donation",
              "Bone Marrow Donation",
              "Cord Blood Donation",
              "Organ Donation",
            ].map((service, index) => (
              <li
                key={index}
                className="flex items-center gap-2 py-2 transition-colors hover:text-[#1A82E0]"
              >
                <IoAddOutline className="text-[#1A82E0]" />
                <NavLink
                  to={`/${service.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-white  text-xs md:text-sm"
                >
                  {service}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul>
            <li className="text-white text-lg font-bold mb-2">Contact Us</li>
            <li className="flex items-center gap-2 my-4">
              <div className="bg-[#1A82E0] text-white p-2 rounded-full text-xl">
                <IoLocationOutline />
              </div>
              <a
                href="https://goo.gl/maps/BYA5MxQUg5B8ZFLcA"
                className="text-white  text-xs md:text-sm"
              >
                <address className="not-italic">
                  Near Thaluk Headquarters,Barishal
                  <br />
                </address>
              </a>
            </li>
            <li className="flex items-center gap-2 my-4">
              <div className="bg-[#1A82E0] text-white p-2 rounded-full text-xl">
                <IoCallOutline />
              </div>
              <a
                href="tel:+917052101786"
                className="text-white  text-xs md:text-sm"
              >
                +01-234-56-789
              </a>
            </li>
            <li className="flex items-center gap-2 my-4">
              <div className="bg-[#1A82E0] text-white p-2 rounded-full text-xl">
                <IoMailOutline />
              </div>
              <a
                href="mailto:redstream001@gmail.com"
                className="text-white  text-xs md:text-sm"
              >
                admin@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#00173D]  text-xs md:text-sm  text-center">
        <div className="container mx-auto">
          <p className="text-white mb-6">
            &copy; 2024 All Rights Reserved by LifeFlow
          </p>
          <ul className="flex justify-center items-center gap-4">
            <li>
              <a
                href=" "
                className="p-2 bg-opacity-20 bg-white text-white rounded-full"
              >
                <IoLogoFacebook className="text-xl" />
              </a>
            </li>
            <li>
              <a
                href=" "
                className="p-2 bg-opacity-20 bg-white text-white rounded-full"
              >
                <IoLogoInstagram className="text-xl" />
              </a>
            </li>
            <li>
              <a
                href=" "
                className="p-2 bg-opacity-20 bg-white text-white rounded-full"
              >
                <IoLogoTwitter className="text-xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
