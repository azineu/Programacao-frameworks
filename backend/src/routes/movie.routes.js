import { Router } from 'express';
import MovieController from '../controllers/MovieController.js';
import MovieValidator from '../middlewares/validators/MovieValidator.js';

const routes = new Router();

routes.post('/movies', MovieValidator.store, MovieController.store);
routes.get('/movies', MovieController.index);
routes.get('/movies/:id', MovieController.show);
routes.put('/movies/:id', MovieValidator.update, MovieController.update);
routes.delete('/movies/:id', MovieController.delete);

export default routes;
