"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppointmentDisease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppointmentDisease.belongsTo(models.Appointment, {
        foreignKey: "appointment_id",
      });
      AppointmentDisease.belongsTo(models.Disease, {
        foreignKey: "disease_id",
      });
    }
  }
  AppointmentDisease.init(
    {
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      disease_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AppointmentDisease",
    },
  );
  return AppointmentDisease;
};
