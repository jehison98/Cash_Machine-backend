const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "card",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 2000,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
