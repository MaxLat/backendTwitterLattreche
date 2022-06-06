import { App } from "./application";
import User from "./src/models/user.model";
import { routerTemplate } from "./src/routes/router.module";
import { sequelize } from "./src/services/dbConnection";
import Post from "./src/models/post.model";
require('dotenv').config();

const port: number = process.env.PORT ? +process.env.PORT : 3000;

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

  const app = new App(
    port,
    [routerTemplate]
  );

  app.listen();
}

startApp();
