import ooredoo from "../assets/logoOoredoo.png";
import ResetPasswordForm from "../components/ForgotPassword/ResetPasswordForm";

const ForgotPassword = () => {
  return (
    <section className=" flex flex-col bg-cover bg-black h-screen w-screen bg-no-repeat bg-ooredooBg  ">
      <div className="w-full bg-white h-20 flex items-center pl-10  ">
        <img src={ooredoo} width={180} alt="logo ooredoo" color="white" />
      </div>

      <ResetPasswordForm />
    </section>
  );
};

export default ForgotPassword;
