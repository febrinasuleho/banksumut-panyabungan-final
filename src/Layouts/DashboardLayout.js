import React, { useState } from "react";
import "./DashboardLayout.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMoneyBill,
  FaFileAlt,
  FaInfoCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div>
          <div className="top-section">
            <h2 className="logo">{collapsed ? "BS" : "Bank Sumut"}</h2>
            <FaBars className="toggle" onClick={() => setCollapsed(!collapsed)} />
          </div>

          <ul>
            <li>
              <NavLink to="/dashboard">
                <FaTachometerAlt />
                {!collapsed && " Dashboard"}
              </NavLink>
            </li>

            <li>
              <NavLink to="/pengajuan-kredit">
                <FaMoneyBill />
                {!collapsed && " Pengajuan Kredit"}
              </NavLink>
            </li>

            <li>
              <NavLink to="/pengaduan">
                <FaFileAlt />
                {!collapsed && " Pengaduan"}
              </NavLink>
            </li>

            <li>
              <NavLink to="/status-layanan">
                <FaInfoCircle />
                {!collapsed && " Status Layanan"}
              </NavLink>
            </li>
          </ul>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          {!collapsed && " Logout"}
        </button>
      </div>

      <div className="content">{children}</div>
    </div>
  );
}

export default DashboardLayout;