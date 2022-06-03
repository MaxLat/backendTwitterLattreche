"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const userRepository_1 = require("../repository/userRepository");
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv').config();
class AuthService {
    userRepository = new userRepository_1.UserRepository();
    authenticateUser() {
        const localOptions = { usernameField: "email" };
        return new passport_local_1.Strategy(localOptions, async (email, password, done) => {
            try {
                const user = await this.userRepository.findOne({ email: email });
                if (!user) {
                    return done(null, false);
                }
                const isEqual = await this.checkPassword(password, user.password);
                if (!isEqual) {
                    return done(null, false);
                }
                const payloadUser = { id: user.id, email: user.email };
                const token = this.generateToken(payloadUser);
                user.token = token;
                return done(null, user);
            }
            catch (error) {
                return done(error);
            }
        });
    }
    authorizeUser() {
        const jwtOptions = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_KEY ? process.env.TOKEN_KEY : "mon token secret"
        };
        return new passport_jwt_1.Strategy(jwtOptions, async (payload, done) => {
            try {
                const user = await this.userRepository.findOne({ id: payload.id });
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            }
            catch (error) {
                return done({ error: error });
            }
        });
    }
    async checkPassword(password, userDbPassword) {
        try {
            return await bcrypt_1.default.compare(password, userDbPassword);
        }
        catch (error) {
            console.log(error);
        }
    }
    generateToken(payloadUser) {
        const payload = payloadUser;
        const secret = process.env.TOKEN_KEY ? process.env.TOKEN_KEY : "mon token secret";
        return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '24h' });
    }
}
exports.AuthService = AuthService;
