const catchError = require('../utils/catchError');
const {movie,studio,actor} = require('../models');

const getAll = catchError(async(req, res) => {
    const results = await movie.findAll({
        include:[
            {
                model:studio,
                attributes:['name']
            },
            {
                model:actor,
                //through: { attributes: [] }, //Decimos a Sequelize -> NO fetch, a las columns del Pivot Table
                attributes:['name']            
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setActor = catchError(async(req, res) => {    // movies/:id/actors
    const {id} = req.params;
    const moviefind = await movie.findByPk(id);

    await moviefind.setActors(req.body);
    const actors = await moviefind.getActors();

    return res.json(actors);
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActor
}