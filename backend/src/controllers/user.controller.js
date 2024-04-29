const { StatusCodes } = require("http-status-codes");
const { getAll, updateOne, deleteOne } = require("../services/user.service");
const { findUser } = require("../services/user.service");
const { BadRequest, FailedDependency } = require("../../config/errors");
const {
  updateOne: updateReservation,
} = require("../services/reservation.service");
const getAllUsers = async (req, res) => {
  const { search, limit, sort, offset, filter } = req.query;

  const { users, count } = await getAll(search, limit, sort, offset, filter);
  res.status(StatusCodes.OK).json({ users, count });
};

const editUser = async (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    throw new BadRequest("Invalid user_id.");
  }
  await updateOne({ ...req.body }, { user_id });
  const user = await findUser({ user_id });
  res.status(StatusCodes.ACCEPTED).json({ user });
};
const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    throw new BadRequest("Invalid user_id.");
  }
  await deleteOne({ user_id });

  res
    .status(StatusCodes.ACCEPTED)
    .json({ message: `User with id :${user_id} was deleted successfully.` });
};
const toggleUser = async (req, res) => {
  let { user_id, active } = req.body;
  active = !active;
  const isUpdated = await updateOne({ active }, { user_id });
  if (!isUpdated) {
    throw new FailedDependency("Request to update user failed.");
  }
  if (active) {
    await updateReservation({ valid: false }, { user_id });
  }

  res
    .status(StatusCodes.ACCEPTED)
    .json({ message: `User with id :${user_id} was updated successfully.` });
};

module.exports = { deleteUser, getAllUsers, editUser, toggleUser };
