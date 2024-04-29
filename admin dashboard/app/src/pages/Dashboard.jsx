import ReservationsPerRoom from "../components/DashboardScreen/ReservationsPerRoom";
import MostBookedRoom from "../components/DashboardScreen/MostBookedRoom";
import ReservationsPerUser from "../components/DashboardScreen/ReservationsPerUser";
import UsersWithMostCancel from "../components/DashboardScreen/UsersWithMostCancel";
import BounceLoader from "react-spinners/BounceLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

import {
  getMostBookedRooms,
  getMostCancelsPerUser,
  getReservationsPerRoom,
  getReservationsPerUser,
} from "../redux/features/DashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReservationsPerRoom());
    dispatch(getReservationsPerUser());
    dispatch(getMostBookedRooms());
    dispatch(getMostCancelsPerUser());
  }, [dispatch]);
  const {
    reservationsPerRoom,
    reservationsPerRoomLoading,
    reservationsPerUser,
    reservationsPerUserLoading,
    mostBookedRoom,
    mostBookedRoomLoading,
    mostCancelsPerUserLoading,
    mostCancelsPerUser,
  } = useSelector((state) => state.dashboard);
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const { offsetWidth } = ref.current;
    setWidth(offsetWidth);
  }, []);
  return (
    <section
      className="h-screen w-full flex flex-col items-center overflow-hidden"
      ref={ref}
    >
      <div className="w-full mt-5  pl-10 flex flex-row justify-between items-start  ">
        <h1 className=" font-sans text-3xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>
      {reservationsPerUserLoading &&
      reservationsPerRoomLoading &&
      mostBookedRoomLoading &&
      mostCancelsPerUserLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <BounceLoader
            color="red"
            loading={reservationsPerUserLoading && reservationsPerRoomLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-20 overflow-y-auto w-full h-full no-scrollbar pb-10 mt-14">
          <div className="w-full  h-full flex justify-between ">
            <div className=" w-full  h-full flex flex-col items-center gap-4 ">
              <ReservationsPerRoom data={reservationsPerRoom} width={width} />
              <h1 className=" text-lg font-bold text-black/50 ">
                Reservations Per Room
              </h1>
            </div>
            <div className="flex flex-col items-center  ">
              <MostBookedRoom data={mostBookedRoom} width={width} />
              <h1 className=" text-lg font-bold text-black/50 -mt-10">
                Rooms with most reservations
              </h1>
            </div>
          </div>
          <div className="flex justify-around pr-10 w-full  h-full ">
            <div className="flex flex-col items-center w-full  h-full ">
              <UsersWithMostCancel data={mostCancelsPerUser} width={width} />
              <h1 className=" text-lg font-bold text-black/50 -mt-10">
                Users with the most reservations cancel
              </h1>
            </div>
            <div className="flex flex-col items-center w-full  h-full gap-4 ">
              <ReservationsPerUser data={reservationsPerUser} width={width} />
              <h1 className=" text-lg font-bold text-black/50 ">
                Reservations Per User
              </h1>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
