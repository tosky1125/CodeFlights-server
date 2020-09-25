'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IATA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  IATA.init({
    cityNameEng: DataTypes.STRING,
    cityNameKor: DataTypes.STRING,
    cityCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IATA',
  });
  return IATA;
};