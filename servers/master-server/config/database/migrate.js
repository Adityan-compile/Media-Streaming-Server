const db = require("./sequelize");

const migrate = async(callback) => {
  try {
    console.info("Running Migrations");
    await db.get().sync({
      alter: true
      });
    return callback(null);
  } catch (e) {
    return callback(e)
  }
};

module.exports = migrate;
