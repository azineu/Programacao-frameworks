import { Router } from 'express';
import movieRoutes from './movie.routes.js';

const routes = new Router();

routes.use(movieRoutes);

export default routes;
