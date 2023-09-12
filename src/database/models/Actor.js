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

        created_at: {
            type: Datatypes.DATE,
            allowNull: false,

          },
          updated_at: {
            type: Datatypes.DATE,
            allowNull: false,
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
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Movie', // Nombre del modelo al que hace referencia
                key: 'id' // Nombre de la columna en la tabla Movie
            }
        },

    };

    const config = {
        tableName: "actors", // Colocar el nombre exacto de la tabla
        timestamps: false
    }

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Actor, { 
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        });

    
    }
    return Actor;
}