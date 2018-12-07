import { NextFunction, Request, Response } from 'express';

export abstract class BaseController {

  protected request: Request;

  protected response: Response;

  protected nextFunction: NextFunction;

  protected constructor(req: Request, resp: Response, next: NextFunction) {
    this.request = req;
    this.response = resp;
    this.nextFunction = next;
  }
}
