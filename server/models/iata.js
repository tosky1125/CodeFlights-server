'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class iata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  iata.init({
    cityNameEng: DataTypes.STRING,
    cityNameKor: DataTypes.STRING,
    cityCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'iata',
  });
  return iata;
};