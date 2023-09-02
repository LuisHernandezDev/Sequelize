const db = require("../database/models");
const { Op } = require("sequelize");

const controller = {
    list: async (req, res) => {
        try {
            const genres = await db.Genre.findAll({ raw: true });
            res.render("genresList", { genres });
            console.log(genres);

        } catch (error) {
            res.send("Error");
            console.error(error);
        }
    },

    detail: async (req, res) => {
        try {
            const genre = await db.Genre.findByPk(req.params.id, { raw: true });
            res.render("genresDetail", { genre });
            console.log(genre);

        } catch (error) {
            res.send("Error");
            console.error(error);
        }
    },
};

module.exports = controller;
