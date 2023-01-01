import { query_joke_availablity } from "../support/Interfaces";
import { memeClassExport as mc} from '../memes/memesHelper'
import { waHelperFunc } from '../support/whatsapp-send-message.js';

class WhatsAppUtilities {
    public respond(mymessage: string, senderID: string): Promise<null>{
        return new Promise((resolve, reject) => {
            mc.returnJokeIfSadElseDialogflow(mymessage).then(res => {
                var response = "";
                if (res.jokeAvailable){
                    response = res.joke;
                }
                else{
                    response = res.response_from_dialogflow;
                }
                waHelperFunc.sendMessage(response, senderID)
            });
        })
    }
}

export let whatsApp = new WhatsAppUtilities()