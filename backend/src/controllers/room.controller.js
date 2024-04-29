const { StatusCodes } = require("http-status-codes");
const {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne,
} = require("../services/room.service");

const getAllRooms = async (req, res) => {
  const { search, limit, offset, filter } = req.query;
  const { rooms, count } = await getAll(search, limit, offset, filter);
  res.status(StatusCodes.OK).json({ rooms, count });
};
const getRoom = async (req, res) => {
  const room_id = req.params.room_id;
  const room = await getOne({ room_id });
  res.status(StatusCodes.OK).json({ data: room });
};
const addRoom = async (req, res) => {
  const details = req.body.details;
  const room = await addOne(details);
  res.status(StatusCodes.CREATED).json({ data: room });
};
const updateRoom = async (req, res) => {
  const details = req.body.details;
  const room_id = req.params.room_id;
  const room = await updateOne(details, { room_id });
  res
    .status(StatusCodes.ACCEPTED)
    .json({ message: `Room with id ${room_id} was updated .` });
};
const deleteRoom = async (req, res) => {
  const room_id = req.params.room_id;
  const room = await deleteOne({ room_id });

  res
    .status(StatusCodes.ACCEPTED)
    .json({ message: `Room with Id ${room_id} was deleted.` });
};
module.exports = { getAllRooms, getRoom, addRoom, updateRoom, deleteRoom };
