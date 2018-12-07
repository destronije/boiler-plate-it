import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from '../../../../backend/app/controllers/BaseController';

export default class __ControllerName__Controller extends BaseController {
  constructor(req: Request, resp: Response, next: NextFunction) {
    super(req, resp, next);
  }

  public static registerRoutes(router: Router) {
    router.get('/__routePath__', (req: Request, resp: Response, next: NextFunction) => {
      new __ControllerName__Controller(req, resp, next).index();
    });
  }

  protected index() {
    let body: object = {
      msg: 'Hello Route Path __routePath__'
    };

    this.response.send(body);
  }
}
