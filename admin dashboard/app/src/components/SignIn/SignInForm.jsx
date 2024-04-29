/* eslint-disable react/prop-types */
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/AuthenticationSlice";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((curr) => !curr);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@ooredoo.tn$");
    if (!strongRegex.test(email)) {
      setEmailError(true);
      return;
    }
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    dispatch(loginUser({ email, password })).then((result) => {
      if (result.payload) {
        navigate("/");
      }
    });
  };
  return (
    <section className="h-full w-full flex flex-col justify-center items-center ">
      <div className="bg-white rounded-2xl w-1/4 h-2/3 flex flex-col items-center ">
        <p className="font-sans font-bold text-4xl text-gray-700 my-10">
          Sign In
        </p>
        <form className=" w-full  ">
          <div className="flex flex-col items-center mb-5 ">
            <div className="w-3/4 mb-2">
              <label
                htmlFor="email"
                className=" text-gray-900 text-lg font-sans font-semibold"
              >
                Email
              </label>
              {emailError && (
                <p className=" text-sm text-red-500 ">
                  Please Provide a valid email adress!
                </p>
              )}
            </div>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="admin@ooredoo.tn"
              className=" outline-none text-md w-3/4 p-2  border border-solid border-gray-300 rounded-lg text-gray-800"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3/4 mb-1">
              <label
                htmlFor="password"
                className=" text-gray-900 text-lg font-sans font-semibold"
              >
                Password
              </label>
              {passwordError && (
                <p className=" text-sm text-red-500 ">
                  Password should be of length 6 at least!
                </p>
              )}
            </div>
            <div className="flex text-gray-800  w-3/4   border border-solid border-gray-300 rounded-lg justify-between items-center">
              <input
                className="p-2 border-none outline-none text-md h-full w-full bg-transparent"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span>
                {showPassword ? (
                  <EyeOff
                    color="gray"
                    onClick={toggleShowPassword}
                    className="hover:cursor-pointer"
                  />
                ) : (
                  <Eye
                    color="gray"
                    onClick={toggleShowPassword}
                    className="hover:cursor-pointer mr-2"
                  />
                )}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-center mt-1">
            <Link
              rel="stylesheet"
              to="/forgot-password"
              className=" text-red-600 underline text-sm"
            >
              Forgot Password
            </Link>
          </div>
        </form>
        <div
          onClick={handleSignIn}
          className="w-2/3 text-white py-2 rounded-xl text-center text-lg mt-10 bg-red-500  hover:bg-red-400 hover:cursor-pointer"
        >
          {"Sign In"}
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
