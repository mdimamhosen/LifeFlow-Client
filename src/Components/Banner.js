import { Link } from "react-router-dom";
import "./Banner.css";
import useAuth from "../Hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="-mb-2">
      <div>
        <div>
          <div className="hero-container hero min-h-[70vh] md:min-h-[70vh]">
            <div className="hero-overlay bg-opacity-50 lg:bg-opacity-20"></div>
            <div className="hero-content text-center flex lg:justify-start lg:items-start  w-screen">
              <div className="  max-w-[480px]  py-2 text-white lg:text-black">
                <h1 className="mb-5 text-5xl lg:text-6xl font-bold capitalize">
                  Be a <span className="text-red-600">life-saving hero</span>
                </h1>
                <p className="mb-5 text-sm w-full lg:w-11/12 mx-auto">
                  Your blood donation can save lives. Join us in our mission to
                  make a difference. Together, we can ensure that no one suffers
                  due to a shortage of blood. Be a hero today – donate blood,
                  save lives.
                </p>

                <div className="flex justify-center items-center font-bold gap-1">
                  {!user && (
                    <Link to="/signup">
                      <button className="   text-sm md:text-base hover:bg-opacity-90 transition-all ease-linear duration-200  p-2 bg-black bg-opacity-70 text-white border border-red-500 rounded-md">
                        Join As Donor
                      </button>
                    </Link>
                  )}
                  <Link to="/search">
                    <button className="hover:bg-opacity-90 transition-all ease-linear duration-200   text-sm md:text-base  p-2 bg-black bg-opacity-70 text-white border border-red-500 rounded-md">
                      Search For Donor
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Other hero sections */}
      </div>
    </div>
  );
};

export default Banner;
