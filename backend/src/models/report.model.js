const { sequelize } = require("../../config/database/database");
const { DataTypes, Model } = require("sequelize");
class Report extends Model {}
Report.init(
  {
    // Model attributes are defined here
    rep_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Generate a UUID using UUIDv4
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "reports",
    modelName: "Report",
    timestamps: true,
  }
);

module.exports = Report;
