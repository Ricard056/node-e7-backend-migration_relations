'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      movie.belongsTo(models.studio) //studioId

      movie.belongsToMany(models.actor, {through: "movieActor"})  //! 0545

    }
  }
  movie.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    duration: {
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    releaseDate: {
      type:DataTypes.DATEONLY,
      allowNull:false
    },
    studioId:{
      type:DataTypes.INTEGER,
      references:{
        model:"studio",
        key:"id"
      }
    }
  }, {
    sequelize,
    modelName: 'movie'
  });
  return movie;
};