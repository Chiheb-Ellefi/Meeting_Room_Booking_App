/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { createUser, fetchUsers } from "../../redux/features/UsersSlice";
import { EyeOff, Eye } from "lucide-react";
import { toast } from "react-toastify";
const AddUserModal = ({ loading, onClose, open }) => {
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    role: "admin",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const createNewUser = () => {
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@ooredoo.tn$");
    if (user.username.length == 0) {
      setUsernameError(true);
      return;
    }
    if (!strongRegex.test(user.email)) {
      setEmailError(true);
      return;
    }

    if (user.password.length < 6) {
      setPasswordError(true);
      return;
    }
    dispatch(createUser(user)).then((result) => {
      if (result.payload) {
        toast.success(`User was created successfully!`);
        dispatch(
          fetchUsers({
            offset: 0,
            limit: 10,
            sort: null,
            filter: "",
            search: "",
          })
        );
        onClose();
        setUser({
          email: "",
          username: "",
          role: "admin",
          password: "",
        });
      }
    });
  };
  return (
    <Modal
      onClose={() => {
        onClose();
        setUser({
          email: "",
          username: "",
          role: "admin",
          password: "",
        });
        setUsernameError(false);
        setPasswordError(false);
        setEmailError(false);
        setShowPassword(false);
      }}
      open={open}
    >
      {
        <div className="text-center w-96 h-auto">
          <h1 className="font-bold text-3xl text-center text-black/80 my-5">
            Add User
          </h1>
          <form className="flex flex-col gap-4 ">
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-4/5 flex flex-col items-start">
                <label
                  className=" text-black/80 font-medium"
                  htmlFor="username"
                >
                  Username
                </label>
                {usernameError && (
                  <p className="text-red-600 text-sm">Username is required!</p>
                )}
              </div>
              <input
                name="username"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                value={user.username}
                className=" bg-gray-100 text-black/80 rounded-md border-gray-500 outline-none w-4/5 px-3 py-2"
              />
            </div>
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-4/5 flex flex-col items-start">
                <label className=" text-black/80 font-medium" htmlFor="email">
                  Email
                </label>
                {emailError && (
                  <p className="text-red-600 text-sm text-right">
                    Please enter a valid email!
                  </p>
                )}
              </div>

              <input
                name="email"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                placeholder="Email@ooredoo.tn"
                className=" bg-gray-100 text-black/80 rounded-md border-gray-500 outline-none w-4/5 px-3 py-2"
              />
            </div>
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-4/5  flex flex-col items-start">
                <label className="text-black/80 font-medium" htmlFor="password">
                  Password
                </label>
                {passwordError && (
                  <p className="text-red-600 text-sm block">
                    Password must contain 6 char atleast !
                  </p>
                )}
              </div>
              <div className=" flex flex-row bg-gray-100 text-black/80 rounded-md border-gray-500  w-4/5 px-3 py-2">
                <input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  className="w-full h-full bg-transparent outline-none "
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() => setShowPassword((curr) => !curr)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-4/5  flex justify-start">
                <label className="text-black/80 font-medium" htmlFor="role">
                  Role
                </label>
              </div>
              <select
                name="role"
                id="role"
                value={user.role}
                onChange={(e) => {
                  setUser({ ...user, role: e.target.value });
                }}
                className=" bg-gray-100 text-black/80 rounded-md border-gray-500 outline-none w-4/5 px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="simple">Simple User</option>
              </select>
            </div>
            <div className="flex  gap-4 justify-center w-full mt-5">
              <button
                className="btn btn-light w-36"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  setUser({
                    email: "",
                    username: "",
                    role: "admin",
                    password: "",
                  });
                  setUsernameError(false);
                  setPasswordError(false);
                  setEmailError(false);
                  setShowPassword(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  createNewUser();
                  setShowPassword(false);
                }}
                className={`btn w-36 ${
                  loading
                    ? "text-white bg-red-200 shadow-red-200/40 cursor-wait"
                    : " btn-danger"
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      }
    </Modal>
  );
};

export default AddUserModal;
