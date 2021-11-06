"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        // autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: [2, 20],
        },
      },
      secondName: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: [2, 20],
        },
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
          len: [1, 40],
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          len: [1, 40],
        },
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  down: async (queryInterface) => {
    return Promise.all([queryInterface.dropTable("User")]);
  },
};
