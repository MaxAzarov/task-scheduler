"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Event", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "User",
        },
      },
      body: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["accept", "decline", "pending"],
      },
      integration: {
        type: Sequelize.UUID,
        references: {
          model: "Integration",
        },
      },
      event_id: {
        type: Sequelize.STRING,
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  down: async (queryInterface) => {
    return Promise.all([queryInterface.dropTable("Event")]);
  },
};
