const { StatusCodes } = require("http-status-codes");
const {
  getReservationsPerRoomService,
  getReservationsPerUserService,
  getMostBookedRoomsService,
  getUsersWithMostCancelsService,
} = require("../services/dashboard.service");
const getReservationsPerRoom = async (req, res) => {
  const data = await getReservationsPerRoomService();
  const response = data.reduce((acc, item) => {
    const { name, valid, count } = item;
    acc[name] = acc[name] || { name };
    acc[name][valid ? "Valid" : "Invalid"] = count;
    return acc;
  }, {});
  res.status(StatusCodes.OK).json(Object.values(response));
};
const getReservationsPerUser = async (req, res) => {
  const data = await getReservationsPerUserService();
  const response = data.reduce((acc, item) => {
    const { username, valid, count } = item;
    acc[username] = acc[username] || { username };
    acc[username][valid ? "Valid" : "Invalid"] = count;
    acc[username]["Invalid"] = acc[username]["Invalid"] || "0";
    acc[username]["Valid"] = acc[username]["Valid"] || "0";
    return acc;
  }, {});

  res.status(StatusCodes.OK).json(Object.values(response));
};
const getMostBookedRooms = async (req, res) => {
  const data = await getMostBookedRoomsService();
  res.status(StatusCodes.OK).json(data);
};
const getUsersWithMostCancels = async (req, res) => {
  const data = await getUsersWithMostCancelsService();
  res.status(StatusCodes.OK).json(data);
};

module.exports = {
  getReservationsPerRoom,
  getReservationsPerUser,
  getMostBookedRooms,
  getUsersWithMostCancels,
};
