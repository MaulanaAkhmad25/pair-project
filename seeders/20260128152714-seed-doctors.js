"use strict";
const fs = require("fs").promises;
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, "../data/doctors.json");

    let data = JSON.parse(
      await fs.readFile(filePath, "utf8")
    ).map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Doctors", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Doctors", null, {});
  },
};
