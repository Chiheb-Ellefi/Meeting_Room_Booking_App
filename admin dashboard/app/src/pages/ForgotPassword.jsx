import ooredoo from "../assets/logoOoredoo.png";
import ResetPasswordForm from "../components/ForgotPassword/ResetPasswordForm";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <section className=" flex flex-col bg-cover bg-black h-screen w-screen bg-no-repeat bg-ooredooBg  ">
      <div className="w-full bg-white h-20 flex items-center pl-10  ">
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

      <ResetPasswordForm />
    </section>
  );
};

export default ForgotPassword;
