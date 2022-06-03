"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const baseController_1 = require("./baseController");
const userRepository_1 = require("../repository/userRepository");
class UserController extends baseController_1.BaseController {
    userRepository = new userRepository_1.UserRepository();
    constructor() {
        super();
    }
    async createUser(req, res) {
        try {
            const user = await this.userRepository.create({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            });
            this.jsonRes(user, res);
        }
        catch (error) {
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
    async getUser(req, res) {
        const user = req.user;
        this.jsonRes({ token: user.token, email: user.email, username: user.username }, res);
    }
    async getAllUser(req, res) {
        try {
            const users = await this.userRepository.findAll();
            this.jsonRes(users, res);
        }
        catch (error) {
            this.errRes(res, "une erreur est survenue lors de la récupération de tous les utilisateurs ");
        }
    }
    async testToken(req, res) {
        this.simpleRes(res);
    }
}
exports.UserController = UserController;
