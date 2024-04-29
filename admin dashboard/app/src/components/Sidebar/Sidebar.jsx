/* eslint-disable react/prop-types */
import logo from "../../assets/logoOoredoo.png";
import smallLogo from "../../assets/ooredoologo.png";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { MoreVertical } from "lucide-react";
import userAvatar from "../../assets/userAvatar.png";
import { LogOut, UserCog } from "lucide-react";

export const SidebarContext = createContext();

export default function Sidebar({ children, setOpen, setConfirmLogout }) {
  const [expanded, setExpanded] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <aside className="h-screen relative">
      <nav className="h-full flex flex-col bg-[#232730] border-r shadow-sm ">
        <div className="p-4 pb-2 flex justify-center items-center mt-10">
          <img
            src={expanded ? logo : smallLogo}
            onClick={() => {
              setExpanded((curr) => !curr);
            }}
            className={`overflow-hidden transition-all hover:cursor-pointer  ${
              expanded ? "w-40" : "w-14"
            }`}
            alt=""
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3  mt-10">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-gray-500 flex pb-2 pt-2 pr-3 pl-3 gap-5  bg-[#232730]">
          <div
            className="rounded-full w-[60px] h-[60px]  hover:cursor-pointer bg-none bg-cover"
            style={{
              backgroundImage: `url(${`${user.image || userAvatar}`})`,
            }}
          ></div>

          <div
            className={`
              flex justify-between items-center 
              overflow-hidden transition-all ${expanded ? "w-52 " : "w-0"}
          `}
          >
            <div className=" flex flex-col justify-start items-start">
              <h4 className="font-semibold text-gray-200 capitalize text-lg">
                {user.username}
              </h4>
              <span className="text-sm text-white font-light">
                {user.email}
              </span>
            </div>
            <button
              onClick={() => {
                setShowMore((curr) => !curr);
              }}
            >
              <MoreVertical color="white" size={25} />
            </button>
            {showMore && (
              <div className="absolute  h-auto flex flex-col bg-white rounded-sm shadow-xl z-50 -right-24 bottom-16 pl-2 gap-2 text-sm font-medium text-black/80 items-start   ">
                <div
                  onClick={() => {
                    setShowMore(false);
                    setConfirmLogout(true);
                  }}
                  className="h-full w-full bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 flex flex-row gap-2 items-center justify-start p-2 pl-1 pr-4 rounded-md hover:cursor-pointer "
                >
                  <LogOut /> <span>Logout</span>
                </div>
                <div
                  onClick={() => {
                    setShowMore(false);
                    setOpen(true);
                  }}
                  className="h-full w-full bg-white transition-colors duration-300 ease-in-out hover:bg-gray-100 flex flex-row gap-2 items-center p-2 pl-1 pr-4 rounded-md hover:cursor-pointer "
                >
                  <UserCog /> <span>Edit User</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
