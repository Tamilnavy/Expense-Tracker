import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);


  const navigate = useNavigate();


  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white/80 backdrop-blur-md border-r border-gray-100 p-5 sticky top-15.25 z-20 transition-all duration-300">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full shadow-lg border-2 border-white object-cover transition-transform duration-300 hover:scale-105"
          />) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-grey-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md shadow-indigo-500/30 font-medium" : "text-gray-600 hover:bg-violet-50 hover:text-violet-600"
            } py-3 px-6 rounded-xl mb-3 transition-all duration-300 transform hover:-translate-y-0.5 group`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className={`text-xl transition-transform duration-300 ${activeMenu === item.label ? "" : "group-hover:scale-110 group-hover:text-violet-600"}`} />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
