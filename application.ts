import { Application } from "express";
import express = require("express");
var cors = require('cors');

export class App {
    public app: Application;

    
    constructor(
        private port: number,
        routes: Array<express.Router>,
    ) {
        this.app = express();
        this.middleware();
        this.assets();
        this.routes(routes);
    }


    private middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
    }

    private routes(routes: Array<express.Router>) {

        //Route pour avoir accès a angular 
        this.app.get('*', (req ,res) => {
            res.sendFile('index.html', {root : '/var/www/html' });
         });

        routes.forEach((r) => {
            this.app.use(`/api`, r);
        });
    }


    private assets() {
        this.app.use('/public', express.static('public'))
        this.app.use('/', express.static('/var/www/html/'));
    }

    /**
     * Start the Express app
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log("APP LISTENING ON PORT:", this.port);
        });
    }
}