"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("watching", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      user: {
        type: Sequelize.STRING,
      },
      filename: {
        type: Sequelize.STRING,
      },
      timestamp: {
        type: Sequelize.STRING
      },
      mediaType: {
        type: Sequelize.STRING,
      },
      mediaId: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("watching");
  },
};
