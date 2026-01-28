'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderHistory.init({
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    diseaseId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'OrderHistory',
  });
  return OrderHistory;
};