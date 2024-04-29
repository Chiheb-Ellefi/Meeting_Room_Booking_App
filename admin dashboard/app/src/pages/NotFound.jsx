import notFoundImage from "../assets/—Pngtree—error 404 page not found_6681621.png";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen w-screen  flex flex-col justify-start items-center">
      <div>
        <img width={400} src={notFoundImage} alt="" />
      </div>
      <div className="flex flex-col gap-5 items-start w-auto">
        <h1 className=" text-5xl font-semibold text-black/80 capitalize">
          {"Somthing's wrong here..."}
        </h1>
        <p className=" text-xl font-semibold text-black/90">
          We cant find the page you are looking for.
        </p>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-danger w-auto"
        >
          Go Home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
