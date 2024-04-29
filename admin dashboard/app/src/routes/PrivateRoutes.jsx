import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { logoutUser } from "../redux/features/AuthenticationSlice";
const PrivateRoutes = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (isLoggedIn) {
    if (user.role == "admin") {
      return <Outlet />;
    }
    dispatch(logoutUser());
  }
  return <Navigate to="/login" />;
};

export default PrivateRoutes;
