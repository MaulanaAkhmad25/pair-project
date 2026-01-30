"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Patient);
      Appointment.belongsTo(models.Doctor);
      Appointment.belongsToMany(models.Disease, {
        through: models.AppointmentDisease,
        foreignKey: "appointment_id",
      });
      Appointment.hasMany(models.AppointmentDisease, {
        foreignKey: "appointment_id",
      });
    }

    static async getAllAppointment(startDate, endDate) {
      const { Patient, Doctor } = require("./index");

      let opt = {
        where: {},
        include: [Patient, Doctor],
        order: [["createdAt", "DESC"]],
      };

      if (startDate && endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        opt.where.createdAt = {
          [Op.between]: [startDate, endDate],
        };
      }

      if (startDate) {
        startDate = new Date(startDate);
        opt.where.createdAt = {
          [Op.gte]: startDate,
        };
      }

      return Appointment.findAll(opt);
    }
  }
  Appointment.init(
    {
      PatientId: DataTypes.INTEGER,
      DoctorId: DataTypes.INTEGER,
      complaint: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Appointment",
    },
  );
  return Appointment;
};
