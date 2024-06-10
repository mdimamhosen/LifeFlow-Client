import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const services = [
  {
    imgSrc:
      "https://wh1t3-e4gl3.github.io/project-red-stream/assets/images/doctor-1.png",
    title: "Pre Book Blood",
    subtitle: "Book Blood For An Upcoming Date",
    link: "#",
  },
  {
    imgSrc:
      "https://wh1t3-e4gl3.github.io/project-red-stream/assets/images/doctor-2.png",
    title: "Call Ambulance",
    subtitle: "Get Our Ambulance Service",
    link: "#",
  },
  {
    imgSrc:
      "https://wh1t3-e4gl3.github.io/project-red-stream/assets/images/doctor-3.png",
    title: "Why Donate?",
    subtitle: "Why Donate Blood?",
    link: "#",
  },
  {
    imgSrc:
      "https://wh1t3-e4gl3.github.io/project-red-stream/assets/images/doctor-4.png",
    title: "Can You Donate?",
    subtitle: "Check If You Can Donate Blood",
    link: " #",
  },
];

const Services = () => {
  return (
    <section className="py-10 bg-gray-200" id="services" aria-label="services">
      <div className="container mx-auto px-4">
        <p className="text-lg text-red-600 font-semibold text-center">
          Emergency!
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mt-2 mb-6">
          Our Other Services
        </h2>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative pb-[90%]">
                <img
                  src={service.imgSrc}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                  <a href={service.link} className="hover:text-red-600">
                    {service.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600">{service.subtitle}</p>
                <div className="flex justify-center mt-4 space-x-2">
                  <a href="#" className="text-red-600 hover:text-red-800">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-800">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-800">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
