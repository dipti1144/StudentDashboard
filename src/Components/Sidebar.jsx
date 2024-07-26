import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
const Sidebar = () => {
  return (
    <div>
      <div className="sidebarDiv">
        <ul>
          <li>
            <Link className="navlink" to="/" >
              Dashboard
            </Link>
          </li>

          <li>
            <Link className="navlink" to="/student">
              Students details
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
