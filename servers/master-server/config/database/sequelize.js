const { Sequelize } = require("sequelize");

const env = process.env;

let state = {
  db: null,
};


state.db = new Sequelize(
  env.PG_DATABASE || "postgres",
  env.PG_USER || "postgres",
  env.PG_PASSWORD || 1234,
  {
    host: env.PG_HOST || "postgres",
    port: env.PG_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: env.POSTGRES_SSL == "true",
    },
    logging: false
  },
);
state.db
  .authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

function get() {
  return state.db;
}

module.exports = {
  get,
};
