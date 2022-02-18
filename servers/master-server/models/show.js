'use strict';
const {
  Model
} = require('sequelize');
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class show extends Model {
    static associate(models) {
    }
  };
  show.init(  {
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
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    lang: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    poster: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    rating: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    ageRating: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    crew: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [{}],
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [""],
    },
    episodes: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [{}],
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: () => {
        return new Date();
      },
    },
  },
  {
    tableName: "shows",
    modelName: "shows",
    sequelize,
    timestamps: true,
  });
  return show;
};