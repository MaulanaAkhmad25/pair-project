"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disease.hasMany(models.AppointmentDisease, { foreignKey: "disease_id" });
      Disease.belongsToMany(models.Appointment, {
        through: models.AppointmentDisease,
        foreignKey: "disease_id",
      });
    }
  }
  Disease.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Disease",
    },
  );
  return Disease;
};
