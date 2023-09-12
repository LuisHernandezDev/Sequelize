const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/:id/detail', moviesController.detail);
router.get('/movies/add', moviesController.getCreate);
router.post('/movies/create', moviesController.postCreate);
router.get('/movies/:id/edit', moviesController.getEdit);
router.put('/movies/:id/edit', moviesController.putEdit);
router.delete('/movies/:id/delete', moviesController.delete);




module.exports = router;