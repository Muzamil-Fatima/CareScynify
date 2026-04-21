import React, { useContext } from "react";
import { ColorModeContext } from "../theme";

import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const TopBar = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md border-b border-gray-200">
      {/* Search */}
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2">
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 bg-transparent outline-none py-1 text-sm"
        />
        <button className="p-2">
          <SearchIcon fontSize="small" />
        </button>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-2">
        <button onClick={colorMode.toggleColorMode} className="p-2">
          <DarkModeOutlinedIcon />
        </button>

        <button className="p-2">
          <NotificationsOutlinedIcon />
        </button>

        <button className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
          <PersonOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
