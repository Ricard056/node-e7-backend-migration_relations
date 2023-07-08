const { getAll, create, getOne, remove, update } = require('../controllers/studio.controllers');
const express = require('express');

const routerStudio = express.Router();

routerStudio.route('/')
    .get(getAll)
    .post(create);

routerStudio.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerStudio;