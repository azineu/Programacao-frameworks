import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import './database/index.js';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(errorHandler);
  }
}

export default new App().server;
