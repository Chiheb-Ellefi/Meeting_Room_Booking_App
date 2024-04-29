const defineAssociations = ({ User, Report, Reservation, Room, Session }) => {
  User.hasMany(Reservation, { foreignKey: "user_id", onDelete: "CASCADE" });
  User.hasMany(Report, { foreignKey: "user_id", onDelete: "CASCADE" });
  User.hasMany(Session, { foreignKey: "user_id", onDelete: "CASCADE" });
  Room.hasMany(Reservation, { foreignKey: "room_id", onDelete: "CASCADE" });
  Reservation.hasOne(Room, { foreignKey: "res_id" });
};

module.exports = defineAssociations;
