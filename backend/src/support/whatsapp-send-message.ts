import { Twilio } from "twilio";


// const client = require('twilio')(accountSid, authToken, { 
//     lazyLoading: true 
// });

class WhatsAppHelperFunction {

    public accountSid: string = process.env.TWILIO_ACCOUNT_SID || "AC2946e0aa9e2cd4d418baef458923f843"; // Your Account SID from www.twilio.com/console
    public authToken: string = process.env.TWILIO_AUTH_TOKEN || "fd50b3e67a68a8e9fe3cd970ba1abe31";   // Your Auth Token from www.twilio.com/console

    // Function to send message to WhatsApp
    public sendMessage(message: string, senderID: string): Promise<null> {
        console.log("Inside");
        console.log(this.accountSid, this.authToken);
        var client = new Twilio(this.accountSid, this.authToken);
        console.log(client);
        return new Promise((resolve, reject) => {
            client.messages.create({
                to: senderID,
                body: message,
                from: `whatsapp:+14155238886`
            })
            .then(ress => {resolve(null);})
            .catch((err:any) => {
                console.log(`Error at sendMessage --> ${err}`);
                reject(null);
            })
        })
    }
}

export let waHelperFunc = new WhatsAppHelperFunction();