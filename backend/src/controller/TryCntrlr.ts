import * as express from 'express';

import { Validator } from '../support/Validator';
import { TryModel } from '../ViewModels/TryModel';

import { waHelperFunc } from '../support/whatsapp-send-message.js'

class TryCntrlr {

    public router: express.Router = express.Router();

    /**
    * The method constructor. Constructor
    *
    */
    public constructor() {
        TryCntrlr.setRouterMiddleWare(this.router);
    }

    /**
    * The method setRouterMiddleWare. 
    *
    * @param router of type express.Router
    * @returns void
    */
    public static setRouterMiddleWare(router: express.Router): void {
    router.route('/')
    .post(TryCntrlr.try);
    }

    public static try(req: express.Request, res: express.Response){
        // let greeting: String = req.query.name?.toString()!;
        console.log("Hit try");
        waHelperFunc.sendMessage("Hello", "whatsapp:+919987994940")
        .then(ress => {
            res.status(200).send("Hello, " + ress);
        })
        .catch(err => {
            res.status(500).send("Error" + err);
        })
        console.log("done try");
        // res.status(200).send("Hello");
      }
}

export let trycntrlr = new TryCntrlr();