import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Users, Home, CalendarDays, Flag, LayoutDashboard } from "lucide-react";
import SidebarItem from "../components/Sidebar/SidebarItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditProfileModal from "../components/Modal/EditProfileModal";
import LogoutConfirmatioModal from "../components/Modal/LogoutConfirmatioModal";
const MainLayout = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  return (
    <>
      {!loading && (
        <div className="flex flex-row">
          <Sidebar
            user={user}
            setOpen={setOpen}
            setConfirmLogout={setConfirmLogout}
          >
            <SidebarItem
              icon={<LayoutDashboard />}
              text={"Dashboard"}
              path="/"
            />
            <SidebarItem icon={<Users />} text={"Users"} path="/users" />
            <SidebarItem icon={<Home />} text={"Rooms"} path="/rooms" />
            <SidebarItem
              icon={<CalendarDays />}
              text={"Reservations"}
              path="/reservations"
            />
            <SidebarItem icon={<Flag />} text={"Reports"} path="/reports" />
          </Sidebar>

          <Outlet />
          <EditProfileModal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
          <LogoutConfirmatioModal
            open={confirmLogout}
            onClose={() => {
              setConfirmLogout(false);
            }}
          />
        </div>
      )}
    </>
  );
};

export default MainLayout;
