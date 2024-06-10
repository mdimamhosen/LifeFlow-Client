import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Components/Banner";
import Featured from "./Components/Featured";
import { FaCube } from "react-icons/fa";
import CurrentRequest from "./Components/CurrentRequest ";
import About from "./Components/About";
import Services from "./Components/Services";
import Stats from "./Components/Stats";
import Testimonials from "./Components/Testimonials";
import ContactUs from "./Components/ContactUs";
import Feature from "./Components/Feature";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>LifeFlow || Home Page</title>
      </Helmet>
      <Banner />
      <Feature />
      <CurrentRequest />
      <About />
      <Featured />
      <Services />
      <Stats />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
