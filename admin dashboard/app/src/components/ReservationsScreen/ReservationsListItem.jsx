import { useState } from "react";
import ReservationDetails from "./ReservationDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelReservation,
  fetchReservations,
} from "../../redux/features/ReservationsSlice";
import { ChevronDown, ChevronUp } from "lucide-react";
const ReservationsListItem = ({ reservation, addToList, selectedList }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleCancelReservation = () => {
    if (reservation.valid) {
      dispatch(
        cancelReservation({
          res_id: reservation.res_id,
          data: { room_id: reservation.room_id, user_id: user.user_id },
        })
      ).then(() => {
        dispatch(fetchReservations({ offset: 0, valid: null }));
      });
    }
  };
  return (
    <>
      <div
        className={`w-full h-auto border-b-2 border-b-gray-100  flex flex-row justify-evenly py-4 items-center   ${
          selectedList.indexOf(
            `${reservation.res_id}:${reservation.room_id}`
          ) != -1
            ? " bg-blue-100/50"
            : ""
        }`}
      >
        <span className="font-sans w-1/4 text-center text-base text-gray-700 capitalize relative">
          <input
            type="checkbox"
            className="absolute left-10 top-1 scale-150"
            width={80}
            value={reservation.res_id}
            checked={
              selectedList.indexOf(
                `${reservation.res_id}:${reservation.room_id}`
              ) != -1
            }
            onChange={() => {
              addToList({
                res_id: reservation.res_id,
                room_id: reservation.room_id,
              });
            }}
          />
          {reservation.room_name}
        </span>
        <span className="font-sans w-1/4 text-center text-base text-gray-700 ">
          {reservation.username}
        </span>

        <span className=" font-sans w-1/4 text-center text-base text-gray-700 flex flex-row gap-2 justify-center">
          <p>{reservation.checkin.time}</p>
          <p>-</p>
          <p>{reservation.checkout.time}</p>
        </span>
        <div className="w-1/4 flex justify-center items-center relative">
          <span
            onClick={handleCancelReservation}
            className={`w-1/3  py-0 text-center shadow-md rounded-md hover:cursor-default ${
              reservation.valid
                ? "bg-green-200 text-green-600 border-2 border-green-600 btn-animation hover:cursor-pointer"
                : reservation.cancelled == null
                ? "bg-red-200 text-red-600 border-2 border-red-600 "
                : "bg-gray-200 text-gray-600 border-2 border-gray-600 "
            }`}
          >
            {reservation.valid
              ? "Valid"
              : reservation.cancelled == null
              ? "Invalid"
              : "Cancelled"}
          </span>
          <span
            className="absolute right-10  text-gray-500 hover:bg-opacity-80 bg-opacity-0 bg-gray-200 rounded-full p-1 hover:cursor-pointer"
            onClick={() => {
              setOpen((curr) => !curr);
            }}
          >
            {!open ? <ChevronDown /> : <ChevronUp />}
          </span>
        </div>
      </div>
      {open && <ReservationDetails reservation={reservation} open={open} />}
    </>
  );
};

export default ReservationsListItem;
