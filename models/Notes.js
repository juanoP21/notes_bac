const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/config.js");

class Notes extends Model {}

Notes.init(
  {
    notes_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {  // Clave foránea para relacionar con User
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users", // Nombre del modelo de usuario
        key: "user_id",
      },
      onDelete: "CASCADE", // Si se elimina un usuario, sus notas también se eliminan
    },
  },
  {
    sequelize,
    modelName: "Notes",
  },
  
);

module.exports = Notes;
