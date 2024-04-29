import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { editUser, editUserPassword } from "../../redux/features/UsersSlice";
import { EyeOff, Eye } from "lucide-react";
import { toast } from "react-toastify";
import userAvatar from "../../assets/userAvatar.png";
import uploadProfileImage from "../../services/UploadProfileImage";
import LoadingModal from "./LoadingModal";
import { setUserProfile } from "../../redux/features/AuthenticationSlice";
const EditProfileModal = ({ onClose, open }) => {
  const { user } = useSelector((state) => state.auth);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [image, setProfileImage] = useState(user.image);
  const [role, setRole] = useState(user.role);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState([]);
  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };
  useEffect(() => {
    if (images.length != 1) return;
    const newImagesUrl = [];
    images.map((image) => newImagesUrl.push(URL.createObjectURL(image)));
    setProfileImage(newImagesUrl[0]);
  }, [images]);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const setInfoToDefault = () => {
    onClose();
    setUsername(user.username);
    setEmail(user.email);
    setPassword("");
    setProfileImage(user.image);
    setRole(user.role);
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);
    setImages([]);
  };

  const editProfile = async () => {
    setLoading(true);
    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@ooredoo.tn$");
    if (username.length == 0) {
      setUsernameError(true);
      return;
    }
    if (!strongRegex.test(email)) {
      setEmailError(true);
      return;
    }

    if (password && password.length < 6) {
      setPasswordError(true);
      return;
    }
    let newUser = { username, email, role };
    if (images.length > 0) {
      console.log("uploading image to firebase...");
      const downloadUrl = await uploadProfileImage({
        imageURL: image,
        email,
      });
      setProfileImage(downloadUrl);
      newUser["image"] = downloadUrl;
    }

    if (password) {
      dispatch(editUserPassword({ email, password }));
    }
    dispatch(editUser({ user_id: user.user_id, data: newUser })).then(
      (result) => {
        if (result.payload) {
          toast.success(`User profile was updated successfully!`);
          dispatch(setUserProfile(newUser));
        }
        setLoading(false);
        setInfoToDefault();
      }
    );
  };

  return (
    <Modal
      onClose={() => {
        setInfoToDefault();
      }}
      open={open}
    >
      {
        <div className="text-center w-[700px] h-auto flex flex-col gap-4 ">
          <h1 className="font-bold text-3xl text-center text-black/80 my-5">
            Edit Profile
          </h1>
          <div className="flex justify-around items-center">
            <input
              type="file"
              multiple={false}
              accept="image/*"
              onChange={onImageChange}
              ref={hiddenFileInput}
              className="hidden"
            />
            <div
              onClick={handleClick}
              className="rounded-full hover:cursor-pointer w-[250px] h-[250px] bg-none bg-cover"
              style={{
                backgroundImage: `url(${`${image || userAvatar}`})`,
              }}
            ></div>
            <form className="flex flex-col gap-4 w-2/4 ">
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-4/5 flex flex-col items-start">
                  <label
                    className=" text-black/80 font-medium"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  {usernameError && (
                    <p className="text-red-600 text-sm">
                      Username is required!
                    </p>
                  )}
                </div>
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email@ooredoo.tn"
                  className=" bg-gray-100 text-black/80 rounded-md border-gray-500 outline-none w-4/5 px-3 py-2"
                />
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-4/5  flex flex-col items-start">
                  <label
                    className="text-black/80 font-medium"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {passwordError && (
                    <p className="text-red-600 text-sm block">
                      Password must contain 6 chars atleast !
                    </p>
                  )}
                </div>
                <div className=" flex flex-row bg-gray-100 text-black/80 rounded-md border-gray-500  w-4/5 px-3 py-2">
                  <input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
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
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className=" bg-gray-100 text-black/80 rounded-md border-gray-500 outline-none w-4/5 px-3 py-2"
                >
                  <option value="admin">Admin</option>
                  <option value="simple">Simple User</option>
                </select>
              </div>
            </form>
          </div>
          <div className="flex  gap-4 justify-end w-full mt-5">
            <button
              className="btn btn-light w-36"
              onClick={(e) => {
                e.preventDefault();
                setInfoToDefault();
              }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editProfile();
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
        </div>
      }
      {loading && <LoadingModal loading={loading} />}
    </Modal>
  );
};

export default EditProfileModal;
