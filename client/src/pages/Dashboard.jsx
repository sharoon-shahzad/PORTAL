import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="h-8 cursor-pointer"
          />
          <div className="flex items-center gap-4">
            <p className="hidden sm:block text-gray-700">Welcome user</p>
            <div className="relative group">
              <img
                className="w-9 h-9 border rounded-full object-cover cursor-pointer"
                src={assets.company_icon}
                alt="User"
              />
              {/* Dropdown */}
              <div className="absolute right-0 top-10 z-20 hidden group-hover:block bg-white border rounded-md shadow-md">
                <ul className="text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-full pt-6">
          <ul className="flex flex-col gap-1">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-3 hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-600"
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Job" className="w-5" />
              <p>Add Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/ManageJobs"
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-3 hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-600"
                }`
              }
            >
              <img src={assets.home_icon} alt="Manage Jobs" className="w-5" />
              <p>Manage Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/ViewApplications"
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-3 hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-600"
                }`
              }
            >
              <img
                src={assets.person_tick_icon}
                alt="View Applications"
                className="w-5"
              />
              <p>View Applications</p>
            </NavLink>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
