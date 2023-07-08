const { getAll, create, getOne, remove, update, setActor } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerMovie.route('/:id/actors')
    .post(setActor)

module.exports = routerMovie;