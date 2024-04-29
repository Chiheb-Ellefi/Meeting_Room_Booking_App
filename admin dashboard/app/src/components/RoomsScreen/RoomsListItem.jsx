import ImageSlider from "../Images/ImageSlider";
import { X } from "lucide-react";
/* eslint-disable react/prop-types */
const RoomsListItem = ({
  room,
  onClick,
  index,
  setOpenConfirmation,
  selectDelete,
}) => {
  const { details } = room;
  const { images, ...data } = details;

  return (
    <div
      onClick={() => {
        onClick({ index });
      }}
      className=" relative flex flex-row justify-around items-center h-auto  bg-gradient-to-b from-gray-50 to-white shadow-md  rounded-md py-4 hover:cursor-pointer  transition-transform ease-in-out delay-150 hover:-translate-y-2  "
    >
      <div className="w-56 h-32">
        <ImageSlider images={images} showIndicator={false} />
      </div>
      <div className="flex flex-col w-2/4 h-full justify-start">
        <p className=" capitalize text-black/70 ">
          {"Room name : " + data.name}
        </p>
        <p className=" capitalize text-black/70">{"Id : " + room.room_id}</p>
        <p className=" capitalize text-black/40">
          {"Location : " + data.location}
        </p>
        <p className=" capitalize text-black/40">{"Site : " + data.site}</p>
      </div>

      <div
        onClick={(e) => {
          e.bubbles = false;
          e.stopPropagation();
          selectDelete({ index });
          setOpenConfirmation(true);
        }}
        className={`absolute right-2 top-2 hover:text-black/70 text-transparent`}
      >
        <X />
      </div>
    </div>
  );
};

export default RoomsListItem;
