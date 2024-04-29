const { sequelize } = require("../../config/database/database");
const moment = require("moment");
const { DataTypes, Model, QueryTypes } = require("sequelize");

class Room extends Model {}

Room.init(
  {
    // Model attributes are defined here
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    details: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    booked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "rooms",
    modelName: "Room",
    timestamps: true,
    hooks: {
      /*afterFind: async (rooms) => {
           await rooms.forEach(async (room) => {
                     const res_id = room.dataValues.res_id;
                     if (res_id) {
                       const reservation = await sequelize.query(
                         "SELECT * FROM reservations where res_id=?",
                         {
                           type: QueryTypes.SELECT,
                           replacements: [res_id],
                         }
                       );
                       if (reservation[0].checkOut.time <= moment().format("HH:mm")) {
                         const room = await sequelize.query(
                           "UPDATE rooms set res_id = null where res_id=?",
                           {
                             type: QueryTypes.UPDATE,
                             replacements: [res_id],
                           }
                         );
                       }
                     }
                   }); 
        },*/
    },
  }
);

module.exports = Room;
