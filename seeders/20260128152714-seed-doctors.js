'use strict';
const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Doctors', [
      {
        name: 'Dr. Andi',
        specialist: 'Umum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. Siti',
        specialist: 'Penyakit Dalam',
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Doctors', null, {})
  }
};
