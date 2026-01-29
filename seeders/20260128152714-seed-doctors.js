"use strict";
const fs = require("fs").promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(
      await fs.readFile("../data/doctors.json", "utf8"),
    ).map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Doctors", data);
    //   await queryInterface.bulkInsert('Doctors', [
    //     {
    //       name: 'Dr. Andi',
    //       specialist: 'Umum',
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     },
    //     {
    //       name: 'Dr. Siti',
    //       specialist: 'Penyakit Dalam',
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //   }
    // ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Doctors", null, {});
  },
};
