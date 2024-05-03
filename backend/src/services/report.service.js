const { Report } = require("../models");

const addOne = async (values) => {
  return await Report.create(values);
};
const getAll = async (whereClause, offset, limit) => {
  return await Report.findAll({
    where: whereClause,
    limit,
    offset: offset,
    order: [["createdAt", "DESC"]],
  });
};
const deleteOne = async ({ rep_id }) => {
  await Report.destroy({ where: { rep_id } });
};
const getCount = async () => {
  return await Report.count();
};
const updateOne = async (details, where) => {
  return await Report.update(details, { where });
};

module.exports = { addOne, getAll, deleteOne, getCount, updateOne };
