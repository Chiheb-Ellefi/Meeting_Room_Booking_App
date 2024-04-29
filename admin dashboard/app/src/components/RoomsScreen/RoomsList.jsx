/* eslint-disable react/prop-types */

import RoomsListItem from "./RoomsListItem";
import { useState } from "react";
import EditRoomModal from "../Modal/EditRoomModal";

import { useDispatch } from "react-redux";
import { deleteRoom, fetchRooms } from "../../redux/features/RoomsSlice";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";
import deleteImagesfromFirebase from "../../services/DeleteImages";
const RoomsList = ({ rooms }) => {
  const [open, setOpen] = useState(false);
  const [currRoom, setRoom] = useState(0);
  const onClick = ({ index }) => {
    setOpen(true);
    setRoom(index);
  };
  const selectDelete = ({ index }) => {
    setRoom(index);
  };
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteRoom = () => {
    const room = rooms[currRoom];
    dispatch(deleteRoom({ room_id: room.room_id })).then((result) => {
      if (result.payload) {
        deleteImagesfromFirebase({
          roomName: room.details.name,
          length: room.details.images.length,
        });
        dispatch(fetchRooms({ offset: 0, limit: 10, filter: "", search: "" }));
      }
    });
  };
  return (
    <div className=" grid grid-cols-2 gap-4 w-full  overflow-y-scroll no-scrollbar pb-12 pt-10 ">
      {rooms?.map((room, index) => {
        return (
          <RoomsListItem
            key={room.room_id}
            room={room}
            onClick={onClick}
            index={index}
            selectDelete={selectDelete}
            setOpenConfirmation={setOpenConfirmation}
          />
        );
      })}
      <EditRoomModal
        room={rooms[currRoom]}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <DeleteConfirmationModal
        open={openConfirmation}
        onClose={() => {
          setOpenConfirmation(false);
        }}
        handleDelete={handleDeleteRoom}
        text={"Are you sure you want to delete this room ?"}
      />
    </div>
  );
};

export default RoomsList;
