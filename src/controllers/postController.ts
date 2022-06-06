import { BaseController } from "./baseController";
import { Response, Request, NextFunction } from "express";
import { AuthService } from "../services/auth";
import { PostRepository } from "../repository/postRepository";
import { UserRepository } from "../repository/userRepository";

export class PostController extends BaseController {
  postRepository = new PostRepository();
  userRepository = new UserRepository();

  constructor() {
    super();
  }

  async createPost(req: any, res: Response) {
    try {
      const user: any = req.user;
      const userId = user.id;
      const url = req.protocol + '://' + req.get('host');
      const post = {
        content: req.body.content,
        ownerId: userId,
        imageUrl : req.file ?  url + '/public/' + req.file.filename : null
      };
      await this.postRepository.create(post);
      this.jsonRes("votre post a bien été enregistré ", res);
    } catch (error: any) {
      this.errRes(res, "une erreur est survenue");
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await this.postRepository.findAll(["content"]);
      this.jsonRes(posts, res);
    } catch (error: any) {
      this.errRes(res, "une erreur est survenue");
    }
  }

  async getTenPreviousPosts(req: Request, res: Response) {
    try {
      const user: any = req.user;
      const previousDate: string | null = req.body.previousDate;
      let posts = await this.postRepository.getTenPreviousPosts(previousDate);
      posts = this.manageEditablePost(posts,user.id)
      
      this.jsonRes(posts, res);
    } catch (error: any) {
      this.errRes(res, "une erreur est survenue");
    }
  }

  public async getPostFromSpecificUser(req: Request, res: Response) {
    try {
      const userFromToken: any = req.user;
      const user = await this.userRepository.findOne({username : req.body.username });
      const previousDate: string | null = req.body.previousDate;
      if(!user){
        this.errRes(res, "Cet utilisateur n'existe pas vous allez être redirigé");
        return;
      }
      let posts = await this.postRepository.getPostFromSpecificUser(user.id,previousDate);
      posts = this.manageEditablePost(posts,userFromToken.id)
      this.jsonRes(posts, res);
    } catch (error: any) {
      this.errRes(res, "une erreur est survenue");
    }
  }

  public async deletePost(req : Request , res : Response) {

    try {
      const userFromToken: any = req.user;
      const post = await this.postRepository.findOne({id : req.params.id });
      if(!post){
        this.errRes(res, "Cet article est introuvable et ne peut être supprimé");
        return;
      }

      if(post.ownerId !== userFromToken.id){
        this.errRes(res, "Vous n'avez pas les droits pour supprimer cet article");
        return;
      }

      await this.postRepository.remove({id : post.id});
      this.jsonRes("l'article à bien été supprimé", res);
    } catch (error: any) {
      this.errRes(res, "une erreur est survenue");
    }

  }

  public async updatePost(req : any , res : Response) {

    try {
      const userFromToken: any = req.user;
      const post = await this.postRepository.findOne({id : req.body.id });
      if(!post){
        this.errRes(res, "Cet article est introuvable et ne peut être édité");
        return;
      }

      if(post.ownerId !== userFromToken.id){
        this.errRes(res, "Vous n'avez pas les droits pour éditer cet article");
        return;
      }

      let imageUrl = null;
      if(req.file){

        const url = req.protocol + '://' + req.get('host');
        imageUrl =  url + '/public/' + req.file.filename;
      }

      if(req.body.imageUrl){
        imageUrl = req.body.imageUrl
      }
 
      await this.postRepository.update({content : req.body.content , imageUrl: imageUrl},{id : req.body.id});
      this.jsonRes("l'article à bien été édité", res);
    } catch (error: any) {
      console.log(error);
      this.errRes(res, "une erreur est survenue");
    }

  }

  private manageEditablePost(posts : Array<any> , userId : number ) : Array<any> {

    for(const post of posts){
      if(post.ownerId === userId){
        post.isEditable = true;
        continue;
      }
      post.isEditable = false;
    }

    return posts
  }

  
}
