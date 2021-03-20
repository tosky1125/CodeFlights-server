import Sequelize from 'sequelize';
import ApplicationConfig from './ApplicationConfig';

const {
  name, user, password, dialect, logging, timezone, charset,
} = ApplicationConfig.getDBConfig();

Sequelize.Promise.config({
  longStackTraces: true,
});

const sequelize = new Sequelize(name, user, password, {
  define: {
    freezeTableName: true,
    timestamps: false,
    underscored: false,
    underscoredAll: false,
    engine: 'InnoDB',
    charset,
  },
  dialect,
  dialectOptions: {
    charset,
    multipleStatements: true,
  },
  logging: logging ? console.log : null,
  timezone,
});

export default sequelize;
