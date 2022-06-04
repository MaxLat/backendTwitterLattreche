"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTemplate = void 0;
//express imports
const express = require("express");
exports.routerTemplate = express.Router();
const passport = require("passport");
//controllers
const controllers_module_1 = require("../controllers/controllers.module");
const auth_1 = require("../services/auth");
const multer = require("multer");
function passportCb(req, res, next) {
    return (error, user) => {
        //Wrap errors in not authenticated error
        if (error) {
            return res
                .status(500)
                .json({ error: "Une erreur est survenue lors du login" });
        }
        //No user found?
        if (!user) {
            return res
                .status(500)
                .json({ error: "Utilisateur ou mot de passe incorrect" });
        }
        //Set user in request
        req.user = user;
        next();
    };
}
// Multer File upload settings
const DIR = "./public/";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, fileName);
    },
});
// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});
const base = "/test";
const auth = new auth_1.AuthService();
passport.use(auth.authenticateUser());
passport.use(auth.authorizeUser());
//Routes
// routerTemplate.post(`${base}`, (req, res) => { exampleController.createFunction(req,res)})
// routerTemplate.put(`${base}/:id`, (req, res) => { exampleController.putFunction(req, res) })
// routerTemplate.delete(`${base}/:id`, (req, res) => { exampleController.deleteById(res, req.params.id)})
exports.routerTemplate.post("/signup", (req, res) => {
    controllers_module_1.userController.createUser(req, res);
});
exports.routerTemplate.post("/signin", (req, res, next) => passport.authenticate("local", { session: false }, passportCb(req, res, next))(req, res, next), (req, res) => {
    controllers_module_1.userController.getUser(req, res);
});
exports.routerTemplate.get(`${base}/token`, passport.authenticate("jwt", { session: false }), (req, res) => {
    controllers_module_1.userController.testToken(req, res);
});
exports.routerTemplate.get("/getalluser", passport.authenticate("jwt", { session: false }), (req, res) => {
    controllers_module_1.userController.getAllUser(req, res);
});
exports.routerTemplate.post("/createpost", passport.authenticate("jwt", { session: false }), upload.single('img'), (req, res) => {
    controllers_module_1.postController.createPost(req, res);
});
exports.routerTemplate.get("/getallposts", passport.authenticate("jwt", { session: false }), (req, res) => {
    controllers_module_1.postController.getAllPosts(req, res);
});
exports.routerTemplate.post("/gettenpreviousposts", passport.authenticate("jwt", { session: false }), (req, res) => {
    controllers_module_1.postController.getTenPreviousPosts(req, res);
});
exports.routerTemplate.post("/getpostsfromspecificuser", passport.authenticate("jwt", { session: false }), (req, res) => {
    controllers_module_1.postController.getPostFromSpecificUser(req, res);
});
exports.routerTemplate.delete("/deletepost/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    controllers_module_1.postController.deletePost(req, res);
});
exports.routerTemplate.put("/updatepost", passport.authenticate("jwt", { session: false }), (req, res) => {
    controllers_module_1.postController.updatePost(req, res);
});