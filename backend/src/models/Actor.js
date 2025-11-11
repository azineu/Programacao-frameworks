import Sequelize, { Model } from 'sequelize';

class Actor extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Movie, { 
      through: 'movie_actors', 
      foreignKey: 'actor_id', 
      as: 'movies' 
    });
  }
}

export default Actor;
