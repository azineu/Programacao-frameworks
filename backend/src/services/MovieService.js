import Movie from '../models/Movie.js';
import Actor from '../models/Actor.js';
import { Sequelize } from 'sequelize';

class MovieService {
  async create(movieData) {
    const { title, age_rating, genre, actors } = movieData;

    const movie = await Movie.create({ title, age_rating, genre });

    if (actors && actors.length > 0) {
      const actorInstances = await Promise.all(
        actors.map(name => Actor.findOrCreate({ where: { name: name.trim() } }))
      );
      const actorIds = actorInstances.map(([actor]) => actor.id);
      await movie.setActors(actorIds);
    }

    return movie;
  }

  async getAll() {
    return Movie.findAll({
      include: { model: Actor, as: 'actors', through: { attributes: [] } },
    });
  }

  async getById(id) {
    return Movie.findByPk(id, {
      include: { model: Actor, as: 'actors', through: { attributes: [] } },
    });
  }

  async update(id, movieData) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return null;
    }

    const { actors, ...data } = movieData;

    await movie.update(data);

    if (actors) {
      const actorInstances = await Promise.all(
        actors.map(name => Actor.findOrCreate({ where: { name: name.trim() } }))
      );
      const actorIds = actorInstances.map(([actor]) => actor.id);
      await movie.setActors(actorIds);
    }

    // Recarrega o filme para incluir os atores atualizados
    const updatedMovie = await Movie.findByPk(id, {
      include: { model: Actor, as: 'actors', through: { attributes: [] } },
    });

    return updatedMovie;
  }

  async delete(id) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return false;
    }

    await movie.destroy();
    return true;
  }
}

export default new MovieService();
