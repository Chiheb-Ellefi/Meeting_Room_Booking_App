import SignInForm from "../components/SignIn/SignInForm";
import ooredoo from "../assets/logoOoredoo.png";
import LoadingModal from "../components/Modal/LoadingModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col bg-cover bg-black h-screen w-screen bg-no-repeat bg-ooredooBg  ">
      <div className="w-full bg-white h-20 flex items-center pl-10   ">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={ooredoo}
          width={180}
          alt="logo ooredoo"
          color="white"
          className="hover:cursor-pointer"
        />
      </div>
      <SignInForm />
      {loading && <LoadingModal loading={loading} />}
    </div>
  );
};

export default SignIn;
