'use strict';
const {
  Model
} = require('sequelize');
const { nanoid } = require("nanoid");
module.exports = (sequelize, DataTypes) => {
  class show extends Model {
    static associate(models) {
      show.hasMany(models.highlights,{foreignKey: 'show', sourceKey: 'id'});
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
      type: DataTypes.STRING(5000),
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
    adult: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    crew: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [{}],
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [""],
    },
    seasons: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [{}],
    },
    backdrop: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    runtime: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    studio: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    trailer: {
      type: DataTypes.STRING,
      defaultValue: ""
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