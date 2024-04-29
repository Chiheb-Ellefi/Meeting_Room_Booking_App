const { sequelize } = require("../../config/database/database");
const { DataTypes, Model, Deferrable } = require("sequelize");
const User = require("./user.model");
class Session extends Model {}
Session.init(
  {
    // Model attributes are defined here
    session_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Generate a UUID using UUIDv4
    },

    refresh_token: {
      type: DataTypes.JSON,
    },
    access_token: {
      type: DataTypes.JSON,
    },
  },
  { sequelize, tableName: "sessions", modelName: "Session", timestamps: true }
);

module.exports = Session;
