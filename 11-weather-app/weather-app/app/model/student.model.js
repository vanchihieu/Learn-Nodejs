const { DataTypes } = require("sequelize");

const createStudentModel = (sequelize) => {
    return sequelize.define(
        "Student",
        {
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            numberClass: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "students",
            timestamps: true,
        }
    );
};
module.exports = {
    createStudentModel,
};
