const db = require('../database/models');
const { Op } = require('sequelize');

const controller = {

    list: async (req, res) => {
        try {
            // Utiliza el modelo Movie desde la constante db
            const movies = await db.Movie.findAll({ 
                raw: true,
                include: "genre",
                nest: true
            });

            res.render('moviesList', { movies });

        } catch (error) {
            res.send("Error");
            console.error(error);

        }
    },

    getDetail: async (req, res) => {
        const id = req.params.id
        try {

            const movie = await db.Movie.findByPk(id, { 
                raw: true,
                include: "genre",
                nest: true
            })
            console.log(movie);
            res.render('moviesDetail', { movie });

        } catch (error) {
            res.send("Error");

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



    getCreate: async (req, res) => {

        try {
            const genres = await db.Genre.findAll();

            res.render('moviesCreate', { genres })

        } catch (error) {
            res.send("Error");

        }

    },

    postCreate: async (req, res) => {
        const newMovie = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id
        }

        try {
            await db.Movie.create(newMovie);
            res.redirect('/movies');

        } catch (error) {
            console.error(error);
            res.send('Error');
        }

    },

    getEdit: async (req, res) => {

        try {
            const movie = await db.Movie.findByPk(req.params.id);

            const genres = await db.Genre.findAll();

            res.render("moviesEdit", { movie, genres })

        } catch (error) {
            res.send("Error")
        }

    },

    putEdit: async (req, res) => {
        const updatedMovie = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id
        }

        try {
            await db.Movie.update(updatedMovie, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/movies/${req.params.id}/detail`)

        } catch (error) {
            res.send('Error')
        }
    },


    delete: async (req, res) => {
        const movieId = req.params.id;

        try {
            const movie = await db.Movie.findByPk(movieId);

            if (!movie) { // Preguntamos Sí movie no existe
                res.send('Película no encontrada');
            }

            await db.Movie.destroy({
                where: {
                    id: movieId
                }
            });
            res.redirect('/movies');

        } catch (error) {
            res.send('Error')
        }
    }

};

module.exports = controller;