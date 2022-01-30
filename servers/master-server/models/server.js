'use strict';
const {
  Model
} = require('sequelize');
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
  class server extends Model {
    static associate(models) {
    }
  };
  server.init(  {
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
    },
    transcoder: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: "server",
    modelName: "server",
    sequelize,
    timestamps: true,
  });
  return server;
};