const { Model, DataTypes } = require("sequelize");
const db = require("../config/database/sequelize");

const { nanoid } = require("nanoid");

class Show extends Model {}

Show.init(
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
    tableName: "shows",
    modelName: "show",
    sequelize: db.get(),
    timestamps: true,
  }
);

module.exports = Show;
