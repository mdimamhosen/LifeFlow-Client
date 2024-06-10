import React from "react";
import "./ErrorPage.css";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="containerX ">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="contentX">
        <h1 className="main-heading">This page is gone.</h1>
        <p>
          ...maybe the page you're looking for is not found or never existed.
        </p>

        <button>
          <NavLink
            className="  py-2 px-1 bg-red-500 rounded text-white font-bold"
            to={"/"}
          >
            Back to home
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
