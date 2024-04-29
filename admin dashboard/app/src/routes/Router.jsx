import MainLayout from "../layouts/MainLayout";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "../pages/SignIn";
import PrivateRoutes from "./PrivateRoutes";
import Users from "../pages/Users";
import Rooms from "../pages/Rooms";
import NotFound from "../pages/NotFound";
import { useSelector } from "react-redux";
import Reservations from "../pages/Reservations";
import Reports from "../pages/Reports";
import BounceLoader from "react-spinners/BounceLoader";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
const Router = () => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <SignIn />
            ) : !loading ? (
              <Navigate to="/" replace />
            ) : (
              <div className="h-screen w-screen flex justify-center items-center">
                <BounceLoader
                  color="red"
                  loading={loading}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            !isLoggedIn ? (
              <ForgotPassword />
            ) : !loading ? (
              <Navigate to="/" replace />
            ) : (
              <div className="h-screen w-screen flex justify-center items-center">
                <BounceLoader
                  color="red"
                  loading={loading}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )
          }
        />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
