

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize( process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:"mysql",port: process.env.DB_PORT
  });

class User extends Model {}

User.init(
  { user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
},
    password: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);

// the defined model is the class itself
module.exports = User;
