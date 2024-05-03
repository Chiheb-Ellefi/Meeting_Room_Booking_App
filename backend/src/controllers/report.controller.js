const { BadRequest } = require("../../config/errors");
const {
  addOne,
  getAll,
  deleteOne,
  getCount,
  updateOne,
} = require("../services/report.service");

const { StatusCodes } = require("http-status-codes");
const { findUser } = require("../services/user.service");

const addReport = async (req, res) => {
  const { description, user_id } = req.body;

  if (!description || !user_id) {
    throw new BadRequest("Provide a report description .");
  }
  const report = await addOne({ description, user_id });
  res.status(StatusCodes.CREATED).json({ data: report });
};

const getAllReports = async (req, res) => {
  const { filter, offset, limit } = req.query;
  let whereClause = {};

  if (filter) {
    for (const key in filter) {
      whereClause[key] = filter[key];
    }
  }
  const reports = await getAll(whereClause, offset, limit);
  let response = [];

  if (reports) {
    const userPromises = reports.map((report) =>
      findUser({ user_id: report.user_id })
    );
    const users = await Promise.all(userPromises);

    response = reports.map((report, index) => ({
      report,
      user: {
        email: users[index].email,
        username: users[index].username,
        image: users[index].image,
      },
    }));
  }
  const count = await getCount();

  res.status(StatusCodes.OK).json({ count, data: response });
};
const deleteReport = async (req, res) => {
  const { rep_id } = req.params;
  await deleteOne({ rep_id });
  res
    .status(StatusCodes.OK)
    .json({ message: "Report was deleted successfully" });
};
const updateReport = async (req, res) => {
  const { rep_id } = req.params;
  const { done } = req.body;
  const where = { rep_id };
  await updateOne({ done }, where);
  res
    .status(StatusCodes.OK)
    .json({ message: "Report was updated successfully" });
};
module.exports = { addReport, getAllReports, deleteReport, updateReport };
