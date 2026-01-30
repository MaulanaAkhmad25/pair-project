'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Doctors", "price", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })

    await queryInterface.addColumn("Doctors", "photo", {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Doctors", "price")
    await queryInterface.removeColumn("Doctors", "photo")
  }
}