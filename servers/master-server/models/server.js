const { Model, DataTypes } = require("sequelize");
const db = require("../config/database/sequelize");

const { nanoid } = require("nanoid");

class Server extends Model {}

Server.init(
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
    tmdbKey: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    videoQuality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    audioQuality: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    tableName: "server",
    modelName: "server",
    sequelize: db.get(),
    timestamps: true,
  }
);

module.exports = Movie;
