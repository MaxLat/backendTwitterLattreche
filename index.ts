import { App } from "./application";
import User from "./src/models/user.model";
//import { middleware } from "./middleware";
import { routerTemplate } from "./src/routes/router.module";
import { sequelize } from "./src/services/dbConnection";
import * as dotenv from "dotenv";
import Post from "./src/models/post.model";
require('dotenv').config();

const port: number = process.env.PORT ? +process.env.PORT : 8080;
let dbConString;

async function dbStart() {
  try {
    await sequelize.authenticate();
    await User.sync({ alter: true });
    await Post.sync({alter : true})
    console.log("Connexion établi");
  } catch (error) {
    console.log(error);
    console.log("Une erreur est survenue lors de la tentative de connexion");
  }
}

async function startApp() {
  await dbStart();
  /**
   * Configure App instance
   */
  const app = new App(
    port,
    [routerTemplate] //* Add your express router objects here
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
