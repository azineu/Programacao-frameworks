import Sequelize, { Model } from 'sequelize';

class Movie extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        age_rating: Sequelize.INTEGER,
        genre: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Actor, { 
      through: 'movie_actors', 
      foreignKey: 'movie_id', 
      as: 'actors' 
    });
  }
}

export default Movie;
