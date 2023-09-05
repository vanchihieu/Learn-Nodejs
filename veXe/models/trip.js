"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Station }) {
            // define association here
            this.belongsTo(Station, { foreignKey: "fromStation" }); // 1 trip co 1 station
            this.belongsTo(Station, { foreignKey: "toStation" });
        }
    }
    Trip.init(
        {
            startTime: DataTypes.DATE,
            price: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: "Trip",
        }
    );
    return Trip;
};
