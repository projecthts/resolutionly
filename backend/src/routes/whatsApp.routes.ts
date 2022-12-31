import * as express from 'express';
import { waHelperFunc } from '../support/whatsapp-send-message.js';
import logger from '../support/logger'

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
}

var whatsAppRoutes = new WhatsAppRoutes();
export default whatsAppRoutes;