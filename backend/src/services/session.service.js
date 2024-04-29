const { Session } = require("../models");

const dropSession = async (options) => {
  const session = await Session.destroy({
    where: options,
  });
  return session;
};
const createSession = async (params) => {
  const session = await Session.create({ ...params });
  return session;
};
const findSession = async (options) => {
  const session = await Session.findOne({
    where: options,
  });
  return session;
};

module.exports = { dropSession, createSession, findSession };
