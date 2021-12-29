const db = require("../../models").sequelize;
const Sequelize = require("../../models").Sequelize;
const { Umzug, SequelizeStorage } = require("umzug");
const path = require("path");

const migrator = new Umzug({
  migrations: {
    glob: path.join(__dirname, "..", "..","migrations/*.js"),
    resolve: ({ name, path, context })=>{
      const migration = require(path || '')
      return {
          name,
          up: async () => migration.up(context, Sequelize),
          down: async () => migration.down(context, Sequelize),
      }
    }
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
    console.info("Pending Migrations: ", await migrator.pending());
    await migrator.up();
    return callback(null);
  } catch (e) {
    return callback(e);
  }
};

module.exports = migrate;
