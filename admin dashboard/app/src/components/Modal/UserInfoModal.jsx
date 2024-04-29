/* eslint-disable react/prop-types */
import Modal from "./Modal";
import userAvatar from "../../assets/userAvatar.png";
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../../redux/features/UsersSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
const UserInfoModal = ({ open, onClose, user }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteUser = () => {
    dispatch(deleteUser({ user_id: user.user_id })).then((result) => {
      if (result.payload) {
        toast.success(`User with id ${user.user_id} was Deleted successfully!`);
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
    <>
      <Modal open={open} onClose={onClose}>
        <div className=" text-center  ">
          <div className="flex flex-row justify-start items-start gap-10 mr-32">
            <div
              className="rounded-full hover:cursor-pointer w-[150px] h-[150px] bg-none bg-cover"
              style={{
                backgroundImage: `url(${`${user.image || userAvatar}`})`,
              }}
            ></div>
            <div className="flex flex-col items-start pt-2 ">
              <h1 className="font-bold text-black/80 text-xl letter">
                {user.username}
              </h1>
              <p className="font-light text-black/50 text-md tracking-widest">
                {user.email}
              </p>
              <p className="font-light text-black/50 text-md tracking-widest">
                Id: {user.user_id}
              </p>
              <p className="font-light text-black/50 text-md tracking-widest capitalize">
                Role: {user.role}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-end mt-2">
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setOpenConfirmation(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      {openConfirmation && (
        <DeleteConfirmationModal
          open={openConfirmation}
          onClose={() => {
            setOpenConfirmation(false);
          }}
          handleDelete={handleDeleteUser}
          text={"Are you sure you want to delete this user ?"}
        />
      )}
    </>
  );
};

export default UserInfoModal;
