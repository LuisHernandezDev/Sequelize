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
                model: "genres", // Nombre de la tabla a la que hace referencia
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
        Movie.belongsTo(models.Genre, { // 1 película pertenece a 1 género // Acá el nombre del modelo debe coincidir con el alias.
            as: "genre",
            timestamps: false,
            foreignKey: "genre_id"
        });

            Movie.belongsToMany(models.Actor, {
                as: "actors", // Nombre de la relación
                through: "ActorMovie", // Nombre del alias de la tabla intermedia
                foreignKey: "movie_id", // foreignKey que hace referencia a este modelo.
                timestamps: false
            });

        };

        return Movie;

    }
