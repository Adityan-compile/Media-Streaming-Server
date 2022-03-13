"use strict";

const { Model } = require("sequelize");
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
  class highlights extends Model {
    static associate(models) {
      this.belongsTo(models.movies, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
        foreignKey: "movie",
        targetKey: "id",
        as: "Movie"
      });
      this.belongsTo(models.shows, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
        foreignKey: "show",
        targetKey: "id",
        as: "Show"
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
