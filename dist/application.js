"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
var cors = require('cors');
/**
 * Primary Class that constructs all of the parts of the Express server
 */
class App {
    port;
    app;
    constructor(port, routes, middleware = []) {
        this.port = port;
        //* Create a new express app
        this.app = express();
        this.middleware(middleware);
        this.routes(routes);
        //this.assets(this.staticPath);
    }
    /**
     * @param mware Array of middlewares to be loaded into express app
     */
    middleware(mware) {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
        this.app.use('/public', express.static('public'));
        this.app.use('/', express.static('/var/www/html/public/angular/'));
    }
    addMiddleWare(middleWare) {
        this.app.use(middleWare);
    }
    /**
     * Attaches route objects to app, appending routes to `apiPath`
     * @param routes Array of router objects to be attached to the app
     */
    routes(routes) {
        //Route pour avoir accès a angular 
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', { root: '/var/www/html/public/angular/' });
        });
        routes.forEach((r) => {
            this.app.use(`/api`, r);
        });
    }
    /**
     * Enable express to serve up static assets
     */
    assets(path) {
        this.app.use(express.static(path));
    }
    /**
     * Start the Express app
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log("APP LISTENING ON PORT:", this.port);
        });
    }
}
exports.App = App;
