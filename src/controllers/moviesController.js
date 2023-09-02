const db = require('../database/models');
const { Op } = require('sequelize');

const controller = {

    list: async (req, res) => {
        try {
            // Utiliza el modelo Movie desde la constante db
            const movies = await db.Movie.findAll({ raw: true });

            res.render('moviesList', { movies });
            console.log(movies);

        } catch (error) {
            res.send("Error");
            console.error(error);

        }
    },

    detail: async (req, res) => {
        try {

            const movie = await db.Movie.findByPk(req.params.id, { raw: true })
            res.render('moviesDetail', { movie });
            console.log(movie);


        } catch (error) {
            res.send("Error");
            console.error(error);

        }
    },

    new: async (req, res) => {
        try {
            const movies = await db.Movie.findAll({

                order: [['title', 'DESC']]
            }, { raw: true });

            res.render('newestMovies', { movies })

        } catch (error) {
            res.send("Error");
            console.error(error);
        }
    },

    recomended: async (req, res) => {
        try {
            const movies = await db.Movie.findAll({

                where: {
                    rating: { [db.Sequelize.Op.gte]: 8 }
                },
                order: [["release_date", 'DESC']],
                limit: 5
            }, { raw: true });

            res.render('recommendedMovies', { movies })


        } catch (error) {
            res.send("Error");

        }
    },

    // deleteProduct: async (req, res) => {

    //     try {
    //         const movies = await db.Movie.findByPk(req.params.id);

    //         if (!movies) {
    //             res.status(404).send('Producto no encontrado');
    //         }

    //         await movies.destroy();

    //     } catch (error) {
    //         res.send("Error");
    //     }
    // }

};

module.exports = controller;