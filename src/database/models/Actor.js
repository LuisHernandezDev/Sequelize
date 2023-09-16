const { DataTypes } = require('sequelize');

module.exports = (sequelize, Datatypes) => {

    const alias = "Actor";

    const cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
    
        first_name: {
            type: Datatypes.STRING,
            allowNull: false

        },

        last_name: {
            type: Datatypes.STRING,
            allowNull: false

        },
        rating: {
            type: Datatypes.DECIMAL(3, 1),
            allowNull: false

        },
        favorite_movie_id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            references: {
                model: 'movies', // Nombre de la tabla a la que hace referencia
                key: 'id' // Nombre de la columna en la tabla movies
            }
        },

    };

    const config = {
        tableName: "actors", // Colocar el nombre exacto de la tabla
        timestamps: false
    }

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Movie, { 
            as: "movies", // Nombre de la relación
            through: "ActorMovie", // Nombre del alias de la tabla intermedia
            foreignKey: "actor_id", // foreignKey que hace referencia a este modelo.
            timestamps: false
        });

    
    }
    return Actor;
}