import * as express from 'express';
import { waHelperFunc } from '../support/whatsapp-send-message.js';
import logger from '../support/logger'
import {whatsApp} from '../ViewModels/WhatsAppUtilities'

class WhatsAppRoutes {

    public router: express.Router = express.Router();


    public constructor() {
        WhatsAppRoutes.setRouterMiddleWare(this.router);
      }

  /**
  * The method setRouterMiddleWare. 
  *
  * @param router of type express.Router
  * @returns void
  */

    public static setRouterMiddleWare(router: express.Router): void {
        router.route('/try')
          .get(WhatsAppRoutes.try);
        router.route('/whatsapp')
            .post(WhatsAppRoutes.response)
    }

    public static try(req: express.Request, res: express.Response){
        logger.log("Hit try", new Date().toString());
        waHelperFunc.sendMessage("Hello", "whatsapp:+919987994940")
        .then(response => {
            logger.log(`/try responded ${response}`, new Date().toString(), "SUCCESS")
            res.status(200).send("Hello, " + response);
        })
        .catch(err => {
            logger.log(`/try failed with error ${err}`, new Date().toString(), "ERROR")
            res.status(500).send("Error" + err);
        })
    }

    public static response(req: express.Request, res: express.Response){
        whatsApp.respond(req.body.body, req.body.From).then(response => {
            res.status(200)
        })
        .catch(err => {
            res.status(500).send("Error" + err);
        })
    }
}

var whatsAppRoutes = new WhatsAppRoutes();
export default whatsAppRoutes;