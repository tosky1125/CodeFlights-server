import DataType from 'sequelize';
import Model from '../../infra/sequelize';

const User = Model.define('User', {
  userId: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataType.STRING(50),
  },
  email: {
    type: DataType.STRING(50),
  },
  password: {
    type: DataType.STRING(50),
  },
}, {
  timestamps: false,
  tableName: 'user',
  comment: 'table stored information of users',
});

export default User;
