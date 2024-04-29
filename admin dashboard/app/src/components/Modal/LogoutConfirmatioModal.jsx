import { logoutUser } from "../../redux/features/AuthenticationSlice";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
const LogoutConfirmatioModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <LogOut size={56} className="mx-auto text-red-600" />

        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800 ">Confirm Logout</h3>
          <p className=" text-sm text-gray-500 ">
            Are you sure you want to logout ?
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="btn btn-light w-full"
            onClick={() => {
              onClose();
            }}
          >
            {"Cancel"}
          </button>
          <button
            onClick={handleLogout}
            className={` w-full btn-animated 
               btn btn-danger
            `}
          >
            {"Logout"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmatioModal;
