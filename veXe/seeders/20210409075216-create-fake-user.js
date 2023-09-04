"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Hao",
          email: "hao09876@gmail.com",
          password: "12312312",
          numberPhone: "0987988776",
          avatar:
            "https://lh6.googleusercontent.com/X7JYEBXkxFMLWlXgsipqGbOYN6j9Lh_83FdKL-WPAtVKZsNnwrEE-VJVR83IXO73jgq4NrVuwPER2JVgkuyIpFMDMLzN3kbY1uHnD2_5enIx52yB-0IWf_VIfgFcpQBb4Yp3-an0",
          type: "ADMIN",
          createdAt: "2021-04-07 08:35:25",
          updatedAt: "2021-04-07 08:35:25",
        },
        {
          name: "Hieu",
          email: "hieu09876@gmail.com",
          password: "42342343",
          numberPhone: "0987988776",
          avatar:
            "https://lh6.googleusercontent.com/X7JYEBXkxFMLWlXgsipqGbOYN6j9Lh_83FdKL-WPAtVKZsNnwrEE-VJVR83IXO73jgq4NrVuwPER2JVgkuyIpFMDMLzN3kbY1uHnD2_5enIx52yB-0IWf_VIfgFcpQBb4Yp3-an0",
          type: "ADMIN",
          createdAt: "2021-04-07 08:35:25",
          updatedAt: "2021-04-07 08:35:25",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};

// run : npx sequelize db:seed:all