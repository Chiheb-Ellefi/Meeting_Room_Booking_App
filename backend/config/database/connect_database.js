const {
  User,
  Report,
  Reservation,
  Room,
  Session,
} = require("../../src/models");

const defineAssociations = require("../../src/models/associations");
const { connect } = require("./database");
module.exports = async () => {
  defineAssociations({
    User,
    Report,
    Reservation,
    Room,
    Session,
  });
  await connect();
};
