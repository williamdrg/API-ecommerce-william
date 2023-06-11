'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('products', [
      {
        name: 'Laptop',
        description: 'Potente portátil con especificaciones de alto rendimiento.',
        price: 1299.99,
        available_qty: 10,
        user_id: 1,
        product_image: 'laptop.jpg'
      },{
        name: 'Smartphone',
        description: 'El último smartphone con funciones avanzadas y una gran cámara.',
        price: 799.99,
        available_qty: 20,
        user_id: 1,
        product_image: 'smartphone.jpg'
      },
      {
        name: 'Headphones',
        description: 'Auriculares inalámbricos con tecnología de cancelación de ruido.',
        price: 199.99,
        available_qty: 15,
        user_id: 1,
        product_image: 'headphones.jpg'
      }
    ], {}); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
