import {SessionsClient} from '@google-cloud/dialogflow';
import { resolve } from 'path';
import {keys} from '../support/Keys';

const sessionClient = new SessionsClient({ credentials: keys.config  });

const textQuery = (userText: string, userId: string): Promise<any> => {    
    const sessionPath = sessionClient.projectAgentSessionPath(keys.config.project_id, keys.config.session_id + userId);
    const request_test  = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: keys.config.languageCode
            }

        }
    }

    return new Promise((resolve, reject) => {
        sessionClient.detectIntent(request_test).then((res: any) => {
            resolve(res)
        }).catch((err: any) => {
            console.log(`Error Occured - ${err}`);
            reject(err);

        }) 
    })
}

export default textQuery;



