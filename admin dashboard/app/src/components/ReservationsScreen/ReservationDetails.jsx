const ReservationDetails = ({ reservation }) => {
  return (
    <div className="flex flex-row flex-shrink justify-around items-center py-4 px-2 opacity-70 ">
      <div>
        <span className="text-md text-black/80 ">Id : </span>
        <span className="text-black/60 text-sm font-medium">
          {reservation.res_id}
        </span>
      </div>
      <div>
        <span className="text-md text-black/80 ">Room : </span>
        <span className="text-black/60 text-sm font-medium capitalize">
          {reservation.room_name}
        </span>
      </div>
      <div>
        <span className="text-md text-black/80  ">User : </span>
        <span className="text-black/60 text-sm font-medium">
          {reservation.username}
        </span>
      </div>
      <div>
        <span className="text-md text-black/80 ">Start : </span>
        <span className="text-black/60 text-sm font-medium">
          {reservation.checkin.date + " - " + reservation.checkin.time}
        </span>
      </div>
      <div>
        <span className="text-md text-black/80 ">End : </span>
        <span className="text-black/60 text-sm font-medium">
          {reservation.checkout.date + " - " + reservation.checkout.time}
        </span>
      </div>
    </div>
  );
};

export default ReservationDetails;
