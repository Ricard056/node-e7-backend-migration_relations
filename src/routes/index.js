const express = require('express');
const routerMovie = require('./movie.router');
const routerStudio = require('./studio.router');
const routerActor = require('./actor.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/movies',routerMovie)
router.use('/studios', routerStudio)
router.use('/actors', routerActor)

module.exports = router;
