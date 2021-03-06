const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "C:/Users/Nico_/Documents/Repo/pi/PI-Food-main/cooking.png",
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdByUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },{
    timestamps: false
  }
  );
};

