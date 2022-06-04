"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const baseRepository_1 = require("./baseRepository");
const { Sequelize } = require('sequelize');
const { gt, lt, ne, in: opIn } = Sequelize.Op;
class PostRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(post_model_1.default);
    }
    async getTenPreviousPosts(previousDate = null) {
        if (previousDate) {
            return await this.model.findAll({ where: { updatedAt: { [lt]: previousDate } }, limit: 10, order: [['updatedAt', 'DESC']], include: [{ model: user_model_1.default, attributes: ['email', 'username'] }] });
        }
        return await this.model.findAll({ limit: 10, order: [['updatedAt', 'DESC']], include: [{ model: user_model_1.default, attributes: ['email', 'username'] }] });
    }
    async getPostFromSpecificUser(userId, previousDate = null) {
        if (previousDate) {
            return await this.model.findAll({ where: { updatedAt: { [lt]: previousDate }, ownerId: userId }, limit: 10, order: [['updatedAt', 'DESC']], include: user_model_1.default });
        }
        return await this.model.findAll({ where: { ownerId: userId }, limit: 10, order: [['updatedAt', 'DESC']], include: user_model_1.default });
    }
}
exports.PostRepository = PostRepository;
