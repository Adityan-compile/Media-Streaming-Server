"use strict";

const { Model } = require("sequelize");
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
  class highlights extends Model {
    static associate(models) {
      highlights.belongsTo(models.movies, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "movie",
        targetKey: "id",
        as: "Movie",
      });
      highlights.belongsTo(models.shows, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "show",
        targetKey: "id",
        as: "Show",
      });
    }
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
        allowNull: false,
      },
      movie: {
        type: DataTypes.STRING,
        references: {
          model: "movie",
          key: "id",
        },
        allowNull: true,
      },
      show: {
        type: DataTypes.STRING,
        references: {
          model: "show",
          key: "id",
        },
        allowNull: true,
      },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: () => {
      //     return new Date();
      //   },
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: () => {
      //     return new Date();
      //   },
      // },
    },
    {
      sequelize,
      modelName: "highlights",
      timestamps: true,
    }
  );
  return highlights;
};
