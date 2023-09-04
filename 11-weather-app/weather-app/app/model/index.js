const { Sequelize } = require("sequelize");
const { DB, USER, PASSWORD, HOST, dialect } = require("../configs/db.config");
const { createStudentModel } = require("./student.model");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
});

const Student = createStudentModel(sequelize)

module.exports = {
    sequelize,
    Student
};
