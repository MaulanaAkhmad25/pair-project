'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.belongsTo(models.User)
      Patient.hasMany(models.Appointment)
    }

    static findWithUser() {
      return this.findAll({ include: 'User' })
    }

    get age() {
     if (!this.birthDate) {
    return '-'
    }

    const now = new Date()
      return now.getFullYear() - this.birthDate.getFullYear()
      }
    }
    
  Patient.init({
    UserId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is Required' },
        notEmpty: { msg: 'Name cannot be empty' }
      }
    },
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Patient',
    hooks:{
      beforeCreate(patient){
        patient.name = patient.name.toUpperCase()
      }
    }
  });
  return Patient;
};