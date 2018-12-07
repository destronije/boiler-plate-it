import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from './BaseController';

export class IndexController extends BaseController {
  constructor(req: Request, resp: Response, next: NextFunction) {
    super(req, resp, next);
  }

  public static registerRoutes(router: Router) {
    router.get('/', (req: Request, resp: Response, next: NextFunction) => {
      new IndexController(req, resp, next).index();
    });
  }

  protected index() {
    console.log('rutaaaaaaaaaaaaa');
    let body: object = {
      msg: 'Hello World'
    };

    return this.response.send(body);
  }
}
