const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/config.js");
const Notes = require("./Notes.js");
class User extends Model {}

User.init(
  {
    user_id: {
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
    modelName: "User",
    
  }
);

User.hasMany(Notes, { foreignKey: "user_id" });
Notes.belongsTo(User, { foreignKey: "user_id" });




module.exports = User;
