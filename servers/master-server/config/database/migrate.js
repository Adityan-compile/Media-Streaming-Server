const db = require("./sequelize");

function migrate(options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.get().sync(options);
      console.log("Migration Successful");
    } catch (e) {
      throw new Error("Migration Failed" + "\n" + e);
    }
  });
}

migrate();

module.exports = migrate;
