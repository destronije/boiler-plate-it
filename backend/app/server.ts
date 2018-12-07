import * as express from 'express';
import * as bodyParser from 'body-parser';
import { IndexController } from './controllers/IndexController';

export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();

    this.config();
    this.routes();
  }

  protected config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
  }

  protected routes() {
    const router = express.Router();

    IndexController.registerRoutes(router);

    this.app.use(router);
  }
}
