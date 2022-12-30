import * as express from 'express';

class ExampleCntrlr {

  public router: express.Router = express.Router();

  /**
  * The method constructor. Constructor
  *
  */
  public constructor() {
    ExampleCntrlr.setRouterMiddleWare(this.router);
  }

  /**
  * The method setRouterMiddleWare. 
  *
  * @param router of type express.Router
  * @returns void
  */
  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/greeting')
      .get(ExampleCntrlr.greeting);
  }

  public static greeting(req: express.Request, res: express.Response){
    let greeting: String = req.query.name?.toString()!;

    res.status(200).send("Hello, " + greeting);
  }
}


export let exampleCntrlr = new ExampleCntrlr();


