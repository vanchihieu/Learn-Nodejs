"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(User, {foreignKey: 'user_id'})
            this.belongsTo(Trip, {foreignKey: 'trip_id'})
        }
    }
    Ticket.init(
        {},
        {
            sequelize,
            modelName: "Ticket",
        }
    );
    return Ticket;
};

// Lam model xong -> run migrations
