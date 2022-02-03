"use strict";

const { Model } = require("sequelize");
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
  class highlights extends Model {
    static associate(models) {}
  }

  highlights.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => {
          return nanoid(20);
        },
      },
      highlightType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      movie: {
        type: DataTypes.STRING,
        references: "movies",
        referencesKey: "id",
        defaultValue: "",
      },
      show: {
        type: DataTypes.STRING,
        references: "shows",
        referencesKey: "id",
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "highlights",
    }
  );
  return highlights;
};
