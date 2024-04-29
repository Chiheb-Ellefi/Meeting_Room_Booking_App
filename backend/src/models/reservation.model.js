const { sequelize } = require("../../config/database/database");
const { DataTypes, Model } = require("sequelize");

class Reservation extends Model {}

Reservation.init(
  {
    // Model attributes are defined here
    res_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    checkin: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    /* checkIn:{
      time:TIME //10:00,
      date:DATE //27/02/2024
    }  checkOut:{
      time:TIME //12:00,
      date:DATE //27/03/2024
    } */
    checkout: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isAfterCheckIn(value) {
          if (new Date(value.date) <= this.checkin.date) {
            throw new Error("Check-out date must be after the check-in date");
          }
        },
      },
    },
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    cancelled: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "reservations",
    modelName: "Reservation",
    timestamps: true,
  }
);

module.exports = Reservation;
