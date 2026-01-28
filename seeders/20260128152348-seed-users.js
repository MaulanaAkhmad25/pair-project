'use strict';
const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'patient@mail.com',
        password: '12345',
        role: 'patient',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'doctor@mail.com',
        password: '12345',
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {})
  }
};
