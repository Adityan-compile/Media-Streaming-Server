const { Model, DataTypes } = require("sequelize");
const db = require("../config/database/sequelize");

const { nanoid } = require("nanoid");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => {
        return nanoid(20);
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "user",
    sequelize: db.get(),
    timestamps: true,
  }
);

module.exports = User;
