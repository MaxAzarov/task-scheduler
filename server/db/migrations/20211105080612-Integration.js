"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Integration", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM,
        values: ["google-calendar", "microsoft-calendar"],
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "User",
        },
      },
      access_token: {
        type: Sequelize.STRING(1500),
      },
      refresh_token: {
        type: Sequelize.STRING(1500),
      },
      calendar_id: {
        type: Sequelize.STRING,
      },
      timezone: {
        type: Sequelize.STRING,
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  down: async (queryInterface) => {
    return Promise.all([queryInterface.dropTable("Integration")]);
  },
};
