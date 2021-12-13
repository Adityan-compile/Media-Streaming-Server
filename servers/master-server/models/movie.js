const { Model, DataTypes } = require("sequelize");
const db = require("../config/database/sequelize");

const { nanoid } = require("nanoid");

class Movie extends Model {}

MOvie.init(
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
    tagline: {
      type: DataTypes.STRING,
      defaultValue: "",
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
    file: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    trailer: {
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
      type: DataTypes.ARRAY,
      defaultValue: "",
    },
    genres: {
        type: DataTypes.ARRAY,
        defaultValue: "",
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: () => {
        return new Date();
      },
    },
  },
  {
    modelName: "user",
    sequelize: db.get(),
    timestamps: true,
  }
);

module.exports = User;
