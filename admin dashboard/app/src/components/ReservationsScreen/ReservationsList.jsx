import ReservationsListItem from "./ReservationsListItem";
import { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import BounceLoader from "react-spinners/BounceLoader";
import {
  cancelReservation,
  deleteReservation,
  fetchReservations,
} from "../../redux/features/ReservationsSlice";
const ReservationsList = ({ reservations }) => {
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const deleteList = () => {
    setLoading(true);
    selectedList.map((item) => {
      dispatch(
        deleteReservation({
          res_id: item.split(":")[0],
          data: { room_id: item.split(":")[1] },
        })
      ).then(() => {
        dispatch(
          fetchReservations({
            offset: 0,
            sort: null,
            valid: null,
            search: null,
          })
        );
      });
    });
    setLoading(false);
  };
  const cancelList = () => {
    setLoading(true);
    selectedList.map((item) => {
      dispatch(
        cancelReservation({
          res_id: item.split(":")[0],
          data: { room_id: item.split(":")[1], user_id: user.user_id },
        })
      ).then(() => {
        dispatch(
          fetchReservations({
            offset: 0,
            sort: null,
            valid: null,
            search: null,
          })
        );
      });
    });
    setLoading(false);
  };
  const addToList = ({ res_id, room_id }) => {
    const index = selectedList.indexOf(`${res_id}:${room_id}`);
    if (index !== -1) {
      setSelectedList((curr) => [
        ...curr.slice(0, index),
        ...curr.slice(index + 1),
      ]);
    } else {
      setSelectedList((curr) => [...curr, `${res_id}:${room_id}`]);
    }
  };
  const styles =
    "text-gray-400 font-sans font-medium w-1/4 text-center tracking-wide";
  return (
    <div
      className={`w-full  bg-gradient-to-b from-gray-50 to-white shadow-lg  rounded-3xl  overflow-hidden mb-8  max-h-[525px] ${
        selectedList.length > 0 && "pb-20 "
      }`}
    >
      <div
        className={`w-full flex flex-row justify-around  py-5 ${
          selectedList.length > 0 && "bg-blue-100/50 "
        }`}
      >
        <span className={styles}>Room</span>
        <span className={styles}>User</span>
        <span className={styles}>Time</span>
        <span className={styles}>Status</span>
      </div>
      {selectedList.length > 0 && (
        <div className="w-full flex  h-20 flex-row items-center  gap-6  text-gray-400 font-sans font-lg tracking-wide bg-blue-100/50">
          <div className="flex ml-6 gap-4 items-center">
            <button
              onClick={() => {
                setSelectedList([]);
              }}
              className="btn-animation"
            >
              <X />
            </button>
            <div className=" text-md">{selectedList.length + " selected"}</div>
          </div>

          <div className=" w-[1px] h-8 bg-gray-400 mx-2"></div>
          <div className="flex  gap-6 items-center">
            <button
              onClick={cancelList}
              className="btn-animation  rounded-lg px-3 py-1 bg-gray-400 text-gray-50 "
            >
              <span>Cancel</span>
            </button>
            <button
              onClick={deleteList}
              className="  btn-animation border-2 border-gray-400 rounded-lg px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <BounceLoader
            color="red"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="overflow-x-hidden overflow-y-scroll no-scrollbar w-full h-full pb-16">
          {reservations?.map((reservation) => {
            return (
              <ReservationsListItem
                addToList={addToList}
                selectedList={selectedList}
                key={reservation.res_id}
                reservation={reservation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationsList;
