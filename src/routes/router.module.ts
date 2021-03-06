import express = require("express");
export const routerTemplate = express.Router();
import passport = require("passport");
import { NextFunction, Response } from "express";

import {
  postController,
  userController,
} from "../controllers/controllers.module";
import { AuthService } from "../services/auth";
const multer = require("multer");

function passportCb(req: any, res: Response, next: NextFunction) {
  return (error: any, user: any) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Une erreur est survenue lors du login" });
    }

    if (!user) {
      return res
        .status(500)
        .json({ error: "Utilisateur ou mot de passe incorrect" });
    }

    req.user = user;
    next();
  };
}

const storage = multer.diskStorage({
  destination: (req : Request, file : any, cb : Function) => {
    const dir = "./public/";
    cb(null, dir);
  },
  filename: (req : Request, file : any, cb: Function) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req : Request, file : any, cb : Function) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});


const auth = new AuthService();
passport.use(auth.authenticateUser());
passport.use(auth.authorizeUser());

routerTemplate.post("/signup", (req, res) => {
  userController.createUser(req, res);
});
routerTemplate.post(
  "/signin",
  (req, res, next) =>
    passport.authenticate(
      "local",
      { session: false },
      passportCb(req, res, next)
    )(req, res, next),
  (req, res) => {
    userController.getUser(req, res);
  }
);
routerTemplate.get(
  "/getalluser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userController.getAllUser(req, res);
  }
);

routerTemplate.post(
  "/createpost",
  passport.authenticate("jwt", { session: false }),
  upload.single('img'),
  (req, res) => {
    postController.createPost(req, res);
  }
);
routerTemplate.get(
  "/getallposts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postController.getAllPosts(req, res);
  }
);
routerTemplate.post(
  "/gettenpreviousposts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postController.getTenPreviousPosts(req, res);
  }
);
routerTemplate.post(
  "/getpostsfromspecificuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postController.getPostFromSpecificUser(req, res);
  }
);
routerTemplate.delete(
  "/deletepost/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postController.deletePost(req, res);
  }
);
routerTemplate.put(
  "/updatepost",
  passport.authenticate("jwt", { session: false }),
  upload.single('img'),
  (req, res) => {
    postController.updatePost(req, res);
  }
);
