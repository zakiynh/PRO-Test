'use strict';

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminDataPath = path.resolve(__dirname, 'admin.json');
    const adminData = JSON.parse(fs.readFileSync(adminDataPath, 'utf8'));

    for (const admin of adminData) {
      admin.password = await bcrypt.hash(admin.password, 10);
      admin.createdAt = new Date();
      admin.updatedAt = new Date();
    }

    await queryInterface.bulkInsert('Users', adminData, {});
  },

  async down(queryInterface, Sequelize) {
    const adminDataPath = path.resolve(__dirname, 'admin.json');
    const adminData = JSON.parse(fs.readFileSync(adminDataPath, 'utf8'));

    await queryInterface.bulkDelete('Users', {
      email: adminData.map(admin => admin.email)
    }, {});
  }
};
