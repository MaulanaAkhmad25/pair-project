"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Patients", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Patients", "UserId");
  },
};
