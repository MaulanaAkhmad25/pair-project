'use strict';
const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Patients', [
      {
        name: 'Dina',
        gender: 'Female',
        dateOfBirth: '2000-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Patients', null, {})
  }
};
