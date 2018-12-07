import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from './BaseController';

export default class __name__Controller extends BaseController {
  constructor(req: Request, resp: Response, next: NextFunction) {
    super(req, resp, next);
  }

  public static registerRoutes(router: Router) {
    router.get('/__path__', (req: Request, resp: Response, next: NextFunction) => {
      new __name__Controller(req, resp, next).index();
    });
  }

  protected index() {
    let body: object = {
      msg: 'Hello Route Path __path__'
    };

    this.response.send(body);
  }
}
