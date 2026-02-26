import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center gap-5 bg-white/80 border-b border-gray-100 backdrop-blur-md py-4 px-7 sticky top-0 z-30 transition-all duration-300 shadow-sm shadow-purple-900/5">
      <button
        className="block lg:hidden text-gray-700 hover:text-violet-600 transition-colors duration-300"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (<HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-16 -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
