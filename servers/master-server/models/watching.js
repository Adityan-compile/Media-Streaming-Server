"use strict";
const { Model } = require("sequelize");
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
  class watching extends Model {
    static associate(models) {}
  }
  watching.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
          return nanoid(20);
        },
      },
      user: {
        type: DataTypes.STRING,
      },
      timestamp: {
        type: DataTypes.STRING,
      },
      filename: {
        type: DataTypes.STRING,
      },
      mediaType: {
        type: DataTypes.STRING,
      },
      mediaId: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      poster: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "watching",
      tableName: "watching",
      timestamps: true,
    }
  );
  return watching;
};
