"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // migrations là một phần quan trọng của quá trình quản lý cơ sở dữ liệu
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Trips", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fromStation: {
                type: Sequelize.INTEGER,
                references: {
                    model: "stations",
                    key: "id",
                },
            },
            toStation: {
                type: Sequelize.INTEGER,
                references: {
                    model: "stations",
                    key: "id",
                },
            },
            startTime: {
                type: Sequelize.DATE,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Trips");
    },
};
// run =>  npx sequelize db:migrate
