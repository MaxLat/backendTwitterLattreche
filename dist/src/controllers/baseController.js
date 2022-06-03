"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
// import mongoose = require('mongoose')
// import { env } from '../environment/env';
// import { IModel } from '../interfaces/IModel';
// import { IPopulate } from '../interfaces/IPopulate';
// import { BaseModel } from '../models/base.model';
/**
 * Provides functions to be used with express routes. Serves common CRUD fuctionality.
 */
class BaseController {
    //public useModReturnNew = { useFindAndModify: false, new: true }
    // public model: IModel;
    // constructor(model: IModel) {
    //     this.model = model;
    // }
    /**
     * Sends the document as JSON in the body of response, and sets status to 200
     * @param doc the MongoDB document to be returned to the client as JSON
     * @param res the response object that will be used to send http response
     */
    jsonRes(doc, res) {
        res.status(200).json(doc);
    }
    simpleRes(res) {
        res.send("Express + TypeScript Server");
    }
    /**
     * @param err error object of any type genereated by the system
     * @param message custom response message to be provided to the client in a JSON body response ({error:'message'})
     * @param res response object to be used to to send
     * @param status custom status code, defaults to 500
     */
    errRes(res, message = "Une erreur est survenue", status = 500) {
        res.status(status).json(message);
    }
}
exports.BaseController = BaseController;
