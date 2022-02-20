'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("shows", "episodes", "seasons");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("shows", "seasons", "episodes");
  }
};
