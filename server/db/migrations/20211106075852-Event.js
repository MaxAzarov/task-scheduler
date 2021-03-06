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
      subject: {
        type: Sequelize.STRING,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      body: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "User",
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ["accept", "decline", "pending"],
      },
      integration_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Integration",
          },
          key: "id",
        },
        allowNull: true,
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
