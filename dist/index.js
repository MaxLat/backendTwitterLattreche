"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
const user_model_1 = __importDefault(require("./src/models/user.model"));
//import { middleware } from "./middleware";
const router_module_1 = require("./src/routes/router.module");
const dbConnection_1 = require("./src/services/dbConnection");
const post_model_1 = __importDefault(require("./src/models/post.model"));
require('dotenv').config();
const port = process.env.PORT ? +process.env.PORT : 8080;
let dbConString;
async function dbStart() {
    try {
        await dbConnection_1.sequelize.authenticate();
        await user_model_1.default.sync({ alter: true });
        await post_model_1.default.sync({ alter: true });
        console.log("Connexion établi");
    }
    catch (error) {
        console.log(error);
        console.log("Une erreur est survenue lors de la tentative de connexion");
    }
}
async function startApp() {
    await dbStart();
    /**
     * Configure App instance
     */
    const app = new application_1.App(port, [router_module_1.routerTemplate] //* Add your express router objects here
    //middleware,
    );
    app.listen();
}
/**
 * Connect to MongoDB
 */
// dbConString
//   ? app.mongoDB(dbConString)
//   : console.log("Not Starting MongoDB Connection");
/**
 * Launch!
 */
startApp();
