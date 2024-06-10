import { NavLink } from "react-router-dom";

const Featured = () => {
  return (
    <div className="px-4 pt-10 bg-gray-200  ">
      <div className="hero pb-[40px] ">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <img
            src="https://images.unsplash.com/photo-1542884841-9f546e727bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg shadow-2xl w-[400px]"
          />
          <div>
            <h1 className="text-3xl font-bold border-b-2 border-red-500">
              Who We Are
            </h1>
            <p className="py-4">
              Blood Donors Group is dedicated to saving lives through the power
              of community blood donation. Our mission is to provide a reliable
              supply of blood to those in need, ensuring that no life is lost
              due to a shortage.
            </p>
            <ul className="pb-4">
              <li className="">{`-> High-quality screening and donation process`}</li>
              <li className="">{`-> Comprehensive support from our dedicated team`}</li>
              <li className="">{`-> Building a network of committed donors`}</li>
            </ul>
            <NavLink
              to="/blogs"
              className="hover:bg-opacity-90 transition-all ease-linear duration-200   text-sm md:text-base  p-2 bg-black bg-opacity-70 text-white border border-red-500 rounded-md"
            >{`Read more`}</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

Featured.propTypes = {};

export default Featured;
