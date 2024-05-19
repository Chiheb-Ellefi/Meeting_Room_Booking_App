const { sequelize } = require("../../config/database/database");
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    details: {
      type: [DataTypes.JSON],
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,

    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 12;
        //generate the salt to add to the password
        const salt = await bcrypt.genSalt(saltRounds);
        //generate the hashed passwored
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
      },
      beforeUpdate: async (user) => {
        // Hash the password before updating (if it has changed)
        if (user.changed("password")) {
          const saltRounds = 12;
          const salt = await bcrypt.genSalt(saltRounds);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        }
      },
    },
  }
);

module.exports = User;
