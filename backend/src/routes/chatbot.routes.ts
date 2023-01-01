import { Router } from 'express';
import textQuery from '../chatbot/chatbot'
const chatBot = Router();

chatBot.post('/text_query', (request:any, response: any) => {
  const {text, userId} = request.body;

  textQuery(text, userId).then((res) => {
    const resultQuery = res;
    const response_object = resultQuery[0];

    const response_console = {
      "responseId": response_object.responseId,
      "queryText:": response_object.queryResult.queryText,
      "action": response_object.queryResult.action,
      "allRequiredParamsPresent": response_object.queryResult.allRequiredParamsPresent,
      "fulfillmentText": response_object.queryResult.fulfillmentText,
    }

    return response.json(response_object);

  });


});

chatBot.get('/',async (request:any, response: any) => {
  return response.json("OK");
});

export default chatBot;