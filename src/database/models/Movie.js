const { DataTypes } = require('sequelize');

module.exports = (sequelize, Datatypes) => {

    const alias = "Movie";

    const cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
    
        title: {
            type: Datatypes.STRING,
            allowNull: false

        },
        rating: {
            type: Datatypes.DECIMAL(3, 1),
            allowNull: false

        },
        awards: {
            type: Datatypes.INTEGER,
            allowNull: false

        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: true
          },
        
        length: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Genre', // Nombre del modelo al que hace referencia
                key: 'id' // Nombre de la columna en la tabla Genre
            }
        },

    };

    const config = {
        tableName: "movies", // Colocar el nombre exacto de la tabla
        timestamps: false
    }

    const Movie = sequelize.define(alias, cols, config);

    return Movie;

}