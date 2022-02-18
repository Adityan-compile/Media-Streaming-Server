'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shows", "file");
    await queryInterface.addColumn("shows", "episodes", {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shows", "file", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("shows", "episodes");
  }
};
