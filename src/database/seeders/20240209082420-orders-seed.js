'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        userid: 1,
        bookid: 1,
        date: '2024-02-09',
        time: '14:30',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 2,
        bookid: 2,
        date: '2024-02-10',
        time: '10:00',
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
