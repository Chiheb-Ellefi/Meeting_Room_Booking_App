/* eslint-disable react/prop-types */
import Modal from "./Modal";
import userAvatar from "../../assets/userAvatar.png";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  editUser,
  fetchUsers,
} from "../../redux/features/UsersSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { X, Plus } from "lucide-react";
const UserInfoModal = ({ open, onClose, user }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [inputs, setInputs] = useState([...user.details]);
  const [isEditing, setIsEditing] = useState(false);
  const handleAddInputFields = (e) => {
    e.preventDefault();
    setInputs([...inputs, { key: "", value: "" }]);
  };
  const handleDelete = (index) => {
    const deleteVal = [...inputs];
    deleteVal.splice(index, 1);
    setInputs(deleteVal);
  };
  const handleChange = (e, index) => {
    const newInputs = [...inputs];
    const { name, value } = e.target;
    newInputs[index][name] = value;
    setInputs(newInputs);
  };
  const dispatch = useDispatch();
  const editUserDetails = () => {
    dispatch(
      editUser({
        user_id: user.user_id,
        data: { ...user, details: [...inputs] },
      })
    ).then((res) => {
      if (res.payload) {
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
      <Modal
        open={open}
        onClose={() => {
          setInputs([...user.details]);
          setIsEditing(false);
          onClose();
        }}
      >
        <div className=" text-center p-2 w-[650px] max-h-[500px] overflow-y-auto">
          <div className="flex flex-row justify-start items-start gap-10 mr-32">
            <div
              className="rounded-full hover:cursor-pointer w-[150px] h-[150px] bg-none bg-cover"
              style={{
                backgroundImage: `url(${`${user.image || userAvatar}`})`,
              }}
            ></div>
            <div className="flex flex-col items-start flex-1">
              <div className="flex justify-between items-center  w-full">
                <h1 className="font-bold text-black/80 text-xl ">
                  {user.username}
                </h1>
                {isEditing ? (
                  <div className="flex justify-end ">
                    <button
                      onClick={handleAddInputFields}
                      className="p-1  shadow-sm rounded-md btn-animation  "
                    >
                      <Plus />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <p className="font-light text-black/50 text-md tracking-widest">
                {user.email}
              </p>
              <p className="font-light text-black/50 text-md tracking-widest">
                Id: {user.user_id}
              </p>
              <p className="font-light text-black/50 text-md tracking-widest capitalize">
                Role: {user.role}
              </p>
              {inputs.length > 0 && (
                <h1 className="font-bold text-black/80 text-xl mt-3">
                  Other Details
                </h1>
              )}
              {inputs.map((input, index) => {
                return (
                  <div
                    key={index}
                    className={`flex   ${isEditing ? "gap-2 mt-5" : " mt-0"}`}
                  >
                    <input
                      name="key"
                      type="text"
                      placeholder="Key"
                      value={input.key}
                      disabled={!isEditing}
                      className={`rounded w-full capitalize font-light text-black/50 text-md tracking-widest  ${
                        isEditing
                          ? "outline-none border-2 border-black/20 pl-2"
                          : ""
                      }`}
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                    />
                    <input
                      name="value"
                      type="text"
                      placeholder="Value"
                      disabled={!isEditing}
                      value={input.value}
                      className={`rounded w-full capitalize font-light text-black/50 text-md tracking-widest   ${
                        isEditing
                          ? "outline-none border-2 border-black/20 pl-2"
                          : ""
                      }`}
                      onChange={(e) => {
                        e.preventDefault();
                        handleChange(e, index);
                      }}
                    />
                    {isEditing && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(index);
                        }}
                      >
                        <X size={20} className="text-gray-400" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-end mt-2">
            <button
              className="btn btn-light"
              onClick={() => {
                isEditing && editUserDetails();
                setIsEditing((curr) => !curr);
              }}
            >
              {isEditing ? "Submit" : "Edit"}
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
