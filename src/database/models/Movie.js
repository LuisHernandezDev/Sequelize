const { DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

    const alias = "Movie";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false // Permitir nulo, false o true
        },
    
        title: {
            type: DataTypes.STRING,
            allowNull: false

        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false

        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
          },
        
        length: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Genre", // Nombre del modelo al que hace referencia
                key: "id" // Nombre de la columna en la tabla Genre
            }
        },

    };

    const config = {
        tableName: "movies", // Colocar el nombre exacto de la tabla
        timestamps: false // Esto quiere decir que no intente crear las columnas created_at y updated_at
    }

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, { 
            as: "genre",
            foreignKey: "genre_id"
        });

        Movie.belongsToMany(models.Actor, {
            as: "actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        })

      };

    return Movie;

}
