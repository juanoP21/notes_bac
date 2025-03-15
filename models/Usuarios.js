const { Model, DataTypes } = require("sequelize");
const {sequelize} = require("../database/config.js");	
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
    
    sequelize, 
    modelName: 'User', 
  },
);

// the defined model is the class itself
module.exports = User;
