import { Model } from "sequelize-typescript";
import Post from "../models/post.model";
import User from "../models/user.model";
import { BaseRepository } from "./baseRepository";
const {Sequelize} = require('sequelize');
const {gt, lt, ne, in: opIn} = Sequelize.Op;


export class PostRepository extends BaseRepository {
  constructor() {
    super(Post);
  }

  public async getTenPreviousPosts(previousDate : string | null = null) {
    if (previousDate) {
      return await this.model.findAll({ where : { updatedAt : { [lt] : previousDate } }  , limit : 10 , order : [['updatedAt','DESC']] , include : User});
    }
    return await this.model.findAll({limit : 10 , order : [['updatedAt','DESC']] , include : User});
  }

  public async getPostFromSpecificUser(userId : number , previousDate : string | null = null){

    if (previousDate) {
        return await this.model.findAll({ where : { updatedAt : { [lt] : previousDate } ,  ownerId : userId  }  , limit : 10 , order : [['updatedAt','DESC']], include : User});
      }
      return await this.model.findAll({  where : { ownerId : userId } , limit : 10 , order : [['updatedAt','DESC']],include : User});

  }
}
