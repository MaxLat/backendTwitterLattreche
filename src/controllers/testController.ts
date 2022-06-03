import { BaseController } from "./baseController";
import { Response, Request } from "express";


export class TestController extends BaseController {
  constructor() {
    super();
  }

  createFunction(req: Request, res: Response) {
    // Add some conditional logic...
    this.simpleRes(res)
  }
}