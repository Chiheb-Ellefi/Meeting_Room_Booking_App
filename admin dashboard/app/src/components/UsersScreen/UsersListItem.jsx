/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import userAvatar from "../../assets/userAvatar.png";
import { fetchUsers, toggleUser } from "../../redux/features/UsersSlice";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { ShieldCheck, ShieldX } from "lucide-react";
import UserInfoModal from "../Modal/UserInfoModal";
import { toast } from "react-toastify";
const UsersListItem = ({ user }) => {
  const { image, email, username, active, user_id, role } = user;
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleUserStatus = () => {
    const data = { user_id, active };
    dispatch(toggleUser(data)).then((result) => {
      if (result.payload) {
        toast.success(
          `User with id ${user.user_id} was ${active ? "Disabled" : "Enabled"}!`
        );
        dispatch(
          fetchUsers({
            offset: 0,
            limit: 10,
            sort: null,
            filter: "",
            search: "",
          })
        );
      }
    });
  };

  return (
    <div
      onClick={() => {
        document.addEventListener("contextmenu", (e) => {
          e.preventDefault();
        });
        setOpen(true);
      }}
      className="  h-auto border-b-2 border-b-gray-100 w-full flex flex-row justify-around py-4 items-center hover:bg-gray-50 hover:cursor-pointer "
    >
      <UserInfoModal
        user={user}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <span className=" font-sans w-1/6 flex  justify-center ">
        <div
          className="rounded-full w-[60px] h-[60px]  hover:cursor-pointer  bg-cover"
          style={{
            backgroundImage: `url(${`${image || userAvatar}`})`,
          }}
        ></div>
      </span>
      <span className="font-sans w-1/6 text-center text-base text-gray-700">
        {user_id}
      </span>
      <span className="font-sans w-1/6 text-center text-base text-gray-700 ">
        {username}
      </span>
      <span
        className={`font-sans w-1/6 text-center text-base  capitalize ${
          role == "admin" ? "text-red-600" : "text-green-600"
        }`}
      >
        {role}
      </span>
      <span className=" font-sans w-1/6 text-center text-base text-gray-700">
        {email}
      </span>
      <span className=" font-sans w-1/6 text-center text-base text-gray-700  ">
        <button
          onClick={(e) => {
            e.bubbles = false;
            e.stopPropagation();
            setConfirm(true);
          }}
          className={` w-24 py-0 text-center shadow-md rounded-md transition-transform ease-in-out delay-150 hover:-translate-y-1 ${
            active
              ? "bg-green-200 text-green-600 border-2 border-green-600 "
              : "bg-red-200 text-red-600 border-2 border-red-600 "
          }`}
        >
          {active ? "Active" : "Inactive"}
        </button>
        <Modal
          open={confirm}
          onClose={() => {
            setConfirm(false);
          }}
        >
          <div className="text-center w-56">
            {active ? (
              <ShieldX size={56} className="mx-auto text-red-600" />
            ) : (
              <ShieldCheck size={56} className="mx-auto text-green-600" />
            )}

            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-gray-800 ">
                {active ? "Confirm Disable" : "Confirm Enable"}
              </h3>
              <p className=" text-sm text-gray-500 ">
                {active
                  ? "Are you sure you want to disable this user ?"
                  : "Are you sure you want to enable this user ?"}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="btn btn-light w-full"
                onClick={() => {
                  setConfirm(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={toggleUserStatus}
                className={` w-full btn-animated ${
                  active ? "btn btn-danger" : "btn btn-safe"
                }`}
              >
                {active ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        </Modal>
      </span>
    </div>
  );
};

export default UsersListItem;
