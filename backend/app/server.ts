import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';

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

    let controllers = fs.readdirSync(__dirname + '/controllers/');
    for (let controllerFileName of controllers) {
      if (controllerFileName === 'BaseController.js') continue;

      let controller = require(`./controllers/${ controllerFileName }`).default;
      console.log(controllerFileName);
      controller.registerRoutes(router);
    }

    this.app.use(router);
  }
}
