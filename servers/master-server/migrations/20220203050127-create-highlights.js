"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("highlights", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      highlightType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      movie: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "movies",
          key: "id",
        },
      },
      show: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "shows",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("highlights");
  },
};
