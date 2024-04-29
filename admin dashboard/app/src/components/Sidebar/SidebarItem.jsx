/* eslint-disable react/prop-types */

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import { ChevronRight } from "lucide-react";
const SidebarItem = ({ icon, text, path }) => {
  const currPath = window.location.pathname;

  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(path);
      }}
      className={`
        relative flex items-center py-2 px-3 my-3
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          path == currPath
            ? "bg-gradient-to-tr from-red-800 to-red-700 text-white"
            : "text-white hover:bg-white hover:text-red-800"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
           z-40
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-red-100 text-red-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}

      {expanded && <ChevronRight />}
    </li>
  );
};

export default SidebarItem;
