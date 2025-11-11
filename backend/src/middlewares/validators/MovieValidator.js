class MovieValidator {
  store(req, res, next) {
    const { title, age_rating, genre } = req.body;

    if (!title || !age_rating || !genre) {
      return res.status(400).json({ error: 'Validation fails: title, age_rating and genre are required.' });
    }

    if (typeof title !== 'string' || typeof age_rating !== 'number' || typeof genre !== 'string') {
        return res.status(400).json({ error: 'Validation fails: invalid data types.' });
    }

    return next();
  }

  update(req, res, next) {
    const { title, age_rating, genre } = req.body;

    if (title && typeof title !== 'string') {
        return res.status(400).json({ error: 'Validation fails: title must be a string.' });
    }

    if (age_rating && typeof age_rating !== 'number') {
        return res.status(400).json({ error: 'Validation fails: age_rating must be a number.' });
    }

    if (genre && typeof genre !== 'string') {
        return res.status(400).json({ error: 'Validation fails: genre must be a string.' });
    }

    return next();
  }
}

export default new MovieValidator();
