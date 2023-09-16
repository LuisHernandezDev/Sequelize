const { DataTypes } = require('sequelize');
const Actor = require('./Actor');
const Movie = require('./Movie');


module.exports = (sequelize, DataTypes) => {

    const alias = "ActorMovie";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false // Permitir nulo, false o true
        },

        actor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "actors", // Nombre de la tabla a la que hace referencia
                key: "id" // Nombre de la columna en la tabla Genre
            }
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "movies", // Nombre de la tabla a la que hace referencia
                key: "id" // Nombre de la columna en la tabla Genre
            }
        },

    };

    const config = {
        tableName: "actor_movie", // Colocar el nombre exacto de la tabla
        timestamps: false // Esto quiere decir que no intente crear las columnas created_at y updated_at
    }

    const ActorMovie = sequelize.define(alias, cols, config);

    // En la tabla intermedia no hace falta hacer las asociaciones. Las mismas se hacen desde las tablas principales de cada una. Por ende, la propiedad otherKey: no es necesaria colocarlas en las asociaciones.

    return ActorMovie;
};


