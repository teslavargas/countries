const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Activity = (sequelize) => {
  // defino el modelo
  return sequelize.define('activity', {
    id: {
      type: DataTypes.UUID, 
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    season: {
        type: DataTypes.STRING, 
        allowNull: true
    }
  });
};
module.exports = Activity