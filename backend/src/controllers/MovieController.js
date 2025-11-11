import MovieService from '../services/MovieService.js';

class MovieController {
  async store(req, res) {
    const movie = await MovieService.create(req.body);
    return res.status(201).json(movie);
  }

  async index(req, res) {
    const movies = await MovieService.getAll();
    return res.json(movies);
  }

  async show(req, res) {
    const movie = await MovieService.getById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.json(movie);
  }

  async update(req, res) {
    const movie = await MovieService.update(req.params.id, req.body);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.json(movie);
  }

  async delete(req, res) {
    const deleted = await MovieService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(204).send();
  }
}

export default new MovieController();
