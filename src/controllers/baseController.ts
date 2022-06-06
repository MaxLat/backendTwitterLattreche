import { Response } from "express";

export class BaseController {
  
  jsonRes(doc: any, res: Response) {
    res.status(200).json(doc);
  }

  simpleRes(res: Response) {
    res.send("Express + TypeScript Server");
  }
  
  errRes(res: Response, message = "Une erreur est survenue",status = 500) {
    res.status(status).json(message);
  }
  
}
