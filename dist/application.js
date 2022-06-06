"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
var cors = require('cors');
class App {
    port;
    app;
    constructor(port, routes) {
        this.port = port;
        this.app = express();
        this.middleware();
        this.routes(routes);
        this.assets();
    }
    middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
    }
    routes(routes) {
        //Route pour avoir accès a angular 
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', { root: '/var/www/html/public/angular/' });
        });
        routes.forEach((r) => {
            this.app.use(`/api`, r);
        });
    }
    assets() {
        this.app.use('/public', express.static('public'));
        this.app.use('/', express.static('/var/www/html/public/angular/'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("APP LISTENING ON PORT:", this.port);
        });
    }
}
exports.App = App;
