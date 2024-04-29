import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
};

export default App;
