"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("movies", "runtime", {
      type: Sequelize.STRING,
      allowNUll: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("movies", "runtime");
  },
};
