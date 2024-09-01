import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/doc-link-icon.png";

export const Footer = () => {
  return (
    <div className="w-full bg-fuchsia-100 flex justify-center align-middle items-center gap-5 p-10">
      <div className="w-1/3">
        <Link to="/">
          <div className="flex items-center">
            <img className="w-12 mr-3" src={logo} alt="Logo" />
            <span className=" text-light-orchid text-3xl font-bold whitespace-nowrap">
              DOC LINK
            </span>
          </div>
        </Link>
        <div className="">
          <p className="text-sm font-normal">
            DOC LINK provides progressive, and affordable healthcare, accessible
            online for everyone
          </p>
          <p className="text-sm font-normal">
            ©DOC LINK PTY LTD 2024. All rights reserved
          </p>
        </div>
      </div>
      <div className="w-1/3">Form</div>
      <div className="w-1/3">navigation</div>
    </div>
  );
};
