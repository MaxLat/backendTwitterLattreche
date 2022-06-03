import { Model } from "sequelize-typescript";
import User from "../models/user.model";
import { BaseRepository } from "./baseRepository";


export class UserRepository extends BaseRepository  {

    constructor() {
        super(User);
    }

    public async createUser(objectValue : object): Promise<void> {
       return await this.create(objectValue)
      }
    
}