"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("shows", "runtime", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("shows", "studio", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("shows", "trailer", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("shows", "runtime", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.removeColumn("shows", "studio", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.removeColumn("shows", "trailer", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
