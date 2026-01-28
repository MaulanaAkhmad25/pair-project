'use strict';
const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Diseases', [
      {
        name: 'Flu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Demam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Batuk',
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Diseases', null, {})
  }
};
