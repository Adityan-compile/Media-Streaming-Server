const db = require("./sequelize").get();
const { Umzug, SequelizeStorage } = require("umzug");
const path = require("path");

const umzug = new Umzug({
  migrations: {
    glob: path.resolve("../../migrations/*.js"),
  },
  context: db.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize: db,
  }),
  logger: console,
});

const migrate = async (callback) => {
  try {
    console.info("Running Migrations");
    await umzug.up();
    return callback(null);
  } catch (e) {
    return callback(e);
  }
};

module.exports = migrate;
