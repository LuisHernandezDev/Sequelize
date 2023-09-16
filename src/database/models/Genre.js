const { DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

    const alias = "Genre";

    const cols = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false

        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: true

        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false

        },

    };

    const config = {
        tableName: "genres",
        timestamps: false
    }

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.hasMany(models.Movie, { // 1 género tiene muchas películas
            as: "movies",
            timestamps: false,
            foreignKey: "genre_id"
        });

    }
    
    return Genre;
    
}
