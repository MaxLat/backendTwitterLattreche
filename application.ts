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
        this.routes(routes);
        this.assets();
    }


    private middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(cors());
        
    }

    private routes(routes: Array<express.Router>) : void {

        //Route pour avoir accès a angular 
        this.app.get('*', (req ,res) => {
            res.sendFile('index.html', {root : '/var/www/html/public/angular/' });
         });

        routes.forEach((r) => {
            this.app.use(`/api`, r);
        });
    }


    private assets() {
        this.app.use('/public', express.static('public'))
        this.app.use('/', express.static('/var/www/html/public/angular/'));
    }

   
    public listen() {
        this.app.listen(this.port, () => {
            console.log("APP LISTENING ON PORT:", this.port);
        });
    }
}