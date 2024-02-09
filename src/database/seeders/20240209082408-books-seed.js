"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'History Book',
        writer: 'misago',
        tags: ['socal', 'science'],
        point: '15',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Love story',
        writer: 'Romeo',
        tags: ['love', 'life'],
        point: '20',
        image: 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
