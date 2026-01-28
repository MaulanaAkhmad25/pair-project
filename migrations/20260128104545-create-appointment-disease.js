"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AppointmentDiseases", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AppointmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Appointments",
          key: "id",
        },
      },
      DiseasesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Diseases",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AppointmentDiseases");
  },
};
