import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import GenerateOTPCode from "../../services/GnerateOTPCode";
import { sendEmail, setCode } from "../../redux/features/AuthenticationSlice";
import { editUserPassword } from "../../redux/features/UsersSlice";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../Modal/LoadingModal";

const ResetPasswordForm = () => {
  const { code, loading } = useSelector((state) => state.auth);
  const { loading: isLoading } = useSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [localCode, setCodeLocally] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [sameCode, setSameCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((curr) => !curr);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((curr) => !curr);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkCode = () => {
    setCodeError(false);
    if (code.length === 4) {
      if (localCode == code) {
        setSameCode(true);
      } else {
        setCodeError(true);
        return;
      }
    }
  };
  const handleSendCode = () => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@ooredoo.tn$");
    setEmailError(false);
    if (email !== "" && !strongRegex.test(email)) {
      setEmailError(true);
      return;
    }
    const generatedCode = GenerateOTPCode();
    dispatch(setCode(generatedCode));

    dispatch(sendEmail({ code: generatedCode, email })).then((result) => {
      if (result.payload) {
        setCodeSent(true);
      }
    });
  };
  const handleEditPassword = () => {
    setPasswordError(false);
    setConfirmPasswordError(false);
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }
    dispatch(
      editUserPassword({ email: "hendhamdi@ooredoo.tn", password })
    ).then((result) => {
      if (result.payload) {
        navigate("/login");
      }
    });
  };
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center ">
        <div
          className={`bg-white rounded-2xl   flex flex-col items-center  p-4 gap-16 ${
            sameCode ? "w-2/3 justify-center " : "w-[400px] justify-start "
          }`}
        >
          <p className="font-sans font-bold text-4xl text-gray-700 mt-10">
            Reset Password
          </p>
          <form
            autoComplete="off"
            className={`flex flex-row w-full items-center ${
              sameCode ? "justify-center" : "justify-center"
            }`}
          >
            <div
              className={`flex flex-col items-center ${
                sameCode ? "w-1/2" : "w-3/4"
              }`}
            >
              <div
                className={` flex flex-col items-items mb-5  ${
                  sameCode ? "w-3/4 " : "w-full"
                }`}
              >
                <div className={` mb-2 `}>
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
                  disabled={sameCode}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="admin@ooredoo.tn"
                  className=" outline-none text-md w-full p-2  border border-solid border-gray-300 rounded-lg text-gray-800"
                />
              </div>
              <div
                className={` flex flex-col items-start mb-5  ${
                  sameCode ? "w-3/4 " : "w-full"
                }`}
              >
                <div className={` mb-2 `}>
                  <label
                    htmlFor="code"
                    className=" text-gray-900 text-lg font-sans font-semibold"
                  >
                    Code
                  </label>
                  {codeError && (
                    <p className=" text-sm text-red-500 ">
                      Please Provide a valid code !
                    </p>
                  )}
                </div>

                <input
                  id="code"
                  name="code"
                  type="text"
                  value={localCode}
                  disabled={!codeSent || sameCode}
                  onChange={(e) => {
                    setCodeLocally(e.target.value);
                  }}
                  placeholder="Code"
                  maxLength={4}
                  className=" outline-none text-md w-full p-2  border border-solid border-gray-300 rounded-lg text-gray-800"
                />
              </div>
            </div>
            {sameCode && (
              <div className="flex flex-col w-1/2 items-center">
                <div
                  className={` flex flex-col items-start mb-5  ${
                    sameCode ? "w-3/4 " : "w-full"
                  }`}
                >
                  <div className={` mb-2  `}>
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
                  <div className="flex text-gray-800  w-full   border border-solid border-gray-300 rounded-lg justify-between items-center">
                    <input
                      autoComplete="false"
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
                <div
                  className={` flex flex-col items-start mb-5  ${
                    sameCode ? "w-3/4 " : "w-full"
                  }`}
                >
                  <div className={` mb-2  `}>
                    <label
                      htmlFor="confirmPassword"
                      className=" text-gray-900 text-lg font-sans font-semibold"
                    >
                      Confirm Password
                    </label>
                    {confirmPasswordError && (
                      <p className=" text-sm text-red-500 ">
                        Passwords do not match!
                      </p>
                    )}
                  </div>
                  <div className="flex text-gray-800  w-full   border border-solid border-gray-300 rounded-lg justify-between items-center">
                    <input
                      className="p-2 border-none outline-none text-md h-full w-full bg-transparent"
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="off"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                    <span>
                      {showConfirmPassword ? (
                        <EyeOff
                          color="gray"
                          onClick={toggleShowConfirmPassword}
                          className="hover:cursor-pointer"
                        />
                      ) : (
                        <Eye
                          color="gray"
                          onClick={toggleShowConfirmPassword}
                          className="hover:cursor-pointer mr-2"
                        />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
          <div className="flex justify-end w-full">
            <button
              onClick={() => {
                {
                  codeSent
                    ? sameCode
                      ? handleEditPassword()
                      : checkCode()
                    : handleSendCode();
                }
              }}
              className="btn btn-animation btn-danger"
            >
              {codeSent ? "SUBMIT" : "Send Email"}
            </button>
          </div>
        </div>
      </div>
      {(loading || isLoading) && <LoadingModal loading={loading} />}
    </>
  );
};

export default ResetPasswordForm;
