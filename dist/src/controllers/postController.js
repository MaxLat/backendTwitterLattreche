"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const baseController_1 = require("./baseController");
const postRepository_1 = require("../repository/postRepository");
const userRepository_1 = require("../repository/userRepository");
class PostController extends baseController_1.BaseController {
    postRepository = new postRepository_1.PostRepository();
    userRepository = new userRepository_1.UserRepository();
    constructor() {
        super();
    }
    async createPost(req, res) {
        try {
            const user = req.user;
            const userId = user.id;
            const url = req.protocol + '://' + req.get('host');
            const post = {
                content: req.body.content,
                ownerId: userId,
                imageUrl: req.file ? url + '/public/' + req.file.filename : null
            };
            await this.postRepository.create(post);
            this.jsonRes("votre post a bien été enregistré ", res);
        }
        catch (error) {
            this.errRes(res, "une erreur est survenue");
        }
    }
    async getAllPosts(req, res) {
        try {
            const posts = await this.postRepository.findAll(["content"]);
            this.jsonRes(posts, res);
        }
        catch (error) {
            this.errRes(res, "une erreur est survenue");
        }
    }
    async getTenPreviousPosts(req, res) {
        try {
            const user = req.user;
            const previousDate = req.body.previousDate;
            let posts = await this.postRepository.getTenPreviousPosts(previousDate);
            posts = this.manageEditablePost(posts, user.id);
            this.jsonRes(posts, res);
        }
        catch (error) {
            this.errRes(res, "une erreur est survenue");
        }
    }
    async getPostFromSpecificUser(req, res) {
        try {
            const userFromToken = req.user;
            const user = await this.userRepository.findOne({ username: req.body.username });
            const previousDate = req.body.previousDate;
            if (!user) {
                this.errRes(res, "Cet utilisateur n'existe pas vous allez être redirigé");
                return;
            }
            let posts = await this.postRepository.getPostFromSpecificUser(user.id, previousDate);
            posts = this.manageEditablePost(posts, userFromToken.id);
            this.jsonRes(posts, res);
        }
        catch (error) {
            this.errRes(res, "une erreur est survenue");
        }
    }
    async deletePost(req, res) {
        try {
            const userFromToken = req.user;
            const post = await this.postRepository.findOne({ id: req.params.id });
            if (!post) {
                this.errRes(res, "Cet article est introuvable et ne peut être supprimé");
                return;
            }
            if (post.ownerId !== userFromToken.id) {
                this.errRes(res, "Vous n'avez pas les droits pour supprimer cet article");
                return;
            }
            await this.postRepository.remove({ id: post.id });
            this.jsonRes("l'article à bien été supprimé", res);
        }
        catch (error) {
            this.errRes(res, "une erreur est survenue");
        }
    }
    async updatePost(req, res) {
        try {
            const userFromToken = req.user;
            const post = await this.postRepository.findOne({ id: req.body.id });
            if (!post) {
                this.errRes(res, "Cet article est introuvable et ne peut être édité");
                return;
            }
            if (post.ownerId !== userFromToken.id) {
                this.errRes(res, "Vous n'avez pas les droits pour éditer cet article");
                return;
            }
            await this.postRepository.update({ content: req.body.content }, { id: req.body.id });
            this.jsonRes("l'article à bien été édité", res);
        }
        catch (error) {
            console.log(error);
            this.errRes(res, "une erreur est survenue");
        }
    }
    manageEditablePost(posts, userId) {
        for (const post of posts) {
            if (post.ownerId === userId) {
                post.isEditable = true;
                continue;
            }
            post.isEditable = false;
        }
        return posts;
    }
}
exports.PostController = PostController;
