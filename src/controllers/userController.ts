import { BaseController } from "./baseController";
import { Response, Request, NextFunction } from "express";
import { UserRepository } from "../repository/userRepository";

export class UserController extends BaseController {
  userRepository = new UserRepository();
  constructor() {
    super();
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userRepository.create({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      });
      this.jsonRes(user, res);
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        if (error.errors[0].message === "email must be unique") {
          this.errRes(res, "cette adresse mail est déja utilisée", 409);
        }

        if (error.errors[0].message === "username must be unique") {
          this.errRes(res, "ce nom d'utilisateur est déja utilisé", 409);
        }

        return;
      }
      this.errRes(res, "une erreur est survenue");
    }
  }

  async getUser(req: Request, res: Response) {
    const user : any = req.user;
    this.jsonRes({ token : user.token , email : user.email , username : user.username}, res);
  }

  async getAllUser(req: Request, res: Response) {
    
    try {
        const users = await this.userRepository.findAll()
        this.jsonRes(users, res);
    } catch (error) {
        this.errRes(res, "une erreur est survenue lors de la récupération de tous les utilisateurs ");
    }
  }

  async testToken(req: Request, res: Response) {
    this.simpleRes(res);
  }
}
