import bcrypt from "bcrypt";

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash("1234", saltRounds);
    await queryInterface.bulkInsert('Users', [
      {
        username: 'John',
        email: 'john@gmail.com',
        role: 'customer',
        password: hashedPassword,
        points: '100',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
      {
        username: 'admin',
        email: 'admin@gmail.com',
        role: 'admin',
        password: hashedPassword,
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
