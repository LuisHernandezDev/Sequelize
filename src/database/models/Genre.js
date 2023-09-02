const { DataTypes } = require('sequelize');

module.exports = (sequelize, Datatypes) => {

    const alias = "Genre";

    const cols = {

        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        name: {
            type: Datatypes.STRING,
            allowNull: false

        },
        ranking: {
            type: Datatypes.INTEGER,
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

    return Genre;

}