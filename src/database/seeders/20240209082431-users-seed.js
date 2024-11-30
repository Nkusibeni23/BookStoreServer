import bcrypt from "bcrypt";

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10; 
    const hashedAdminPassword = await bcrypt.hash("admin", saltRounds);
    const hashedUserPassword = await bcrypt.hash("admin", saltRounds);
    await queryInterface.bulkInsert('Users', [
      {
        username: 'John',
        email: 'john@gmail.com',
        role: 'customer',
        password: hashedUserPassword,
        points: '100',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
      {
        username: 'admin',
        email: 'admin@gmail.com',
        role: 'admin',
        password: hashedAdminPassword,
        points: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
   
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
