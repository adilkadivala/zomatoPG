import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../assets/style/admin/sidebar.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  return (
    <>
      <section id="sidebar" className={isOpen ? "" : "hide"}>
        <NavLink to="/dashboard" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">AdminHub</span>
        </NavLink>
        <ul className="side-menu top">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <NavLink to="/dashboard">
              <i className="fa-solid fa-list"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/addcity" ? "active" : ""}>
            <NavLink to="/addcity">
              <i className="fa-solid fa-shirt"></i>
              <span className="text">City</span>
            </NavLink>
          </li>
          <li
            className={location.pathname === "/addcollection" ? "active" : ""}
          >
            <NavLink to="/addcollection">
              <i className="fa-solid fa-phone"></i>
              <span className="text">Collection</span>
            </NavLink>
          </li>

          <li className={location.pathname === "/hoteldetail" ? "active" : ""}>
            <NavLink to="/hoteldetail">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span className="text">Service</span>
            </NavLink>
          </li>

          {/* <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <NavLink to="/dashboard">
              <i className="fa-solid fa-gift"></i>
              <span className="text">Project</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <NavLink to="/dashboard">
              <i className="fa-solid fa-users"></i>
              <span className="text">Profile</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <NavLink to="/dashboard">
              <i className="fa-solid fa-user"></i>
              <span className="text">User Data</span>
            </NavLink>
          </li> */}
        </ul>

        <ul className="side-menu">
          <li>
            <NavLink to="/dashboard">
              <i className="fa-solid fa-gear"></i>
              <span className="text">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="logout">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className="text">Logout</span>
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
