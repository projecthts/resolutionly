
import { rejects } from 'assert';
import axios from 'axios' 
import { resolve } from 'path';
import {response_meme, query_joke_availablity} from '../support/Interfaces'
import sentimentAnalysisHelper from '../sentimentAnalysis/sentimentAnalysisHelper';
import meme from '../routes/memes.routes';
import {keys} from '../support/Keys'
import textQuery from '../chatbot/chatbot'

class memeClass{
    public memeRequest (): Promise<response_meme> {    
        const options: any = {
            method: 'GET',
            url: 'https://backend-omega-seven.vercel.app/api/getjoke',
            
        };
    
        return new Promise((resolve, reject) => {
            axios
            .request(options)
            .then(function (response) {
                const result = response.data;
                const firstElement = result[0];
    
                console.log(`firstElement ${firstElement}`)
                
               
    
                const joke: string =   `${firstElement["question"]} \n ${firstElement["punchline"]}`
                console.log(`joke ${joke}`)
                const staticImage: string = "https://cdn.hashnode.com/res/hashnode/image/upload/v1672516700017/a819c388-1860-4acb-ac02-2b9ab838931b.jpeg"
    
                const response_out: response_meme = {"joke": joke, "image": staticImage};
                console.log(`response_out helper ${JSON.stringify(response_out)}`)
                resolve(response_out);
            })
            .catch(function (error) {
                console.error(`Error Occured - ${error}`);
                reject(error.toString());
            });
        })
    }

    
    public returnJokeIfSadElseDialogflow (inputText: string): Promise<query_joke_availablity> {

        return new Promise((resolve, reject) => {
            sentimentAnalysisHelper(inputText).then((response_out) => {
                console.log("Inside class");
                const compound_score: number = response_out;
                console.log(`compound_score ${compound_score}`);

                const finalResponse: query_joke_availablity = {
                    joke: "",
                    image: "",
                    jokeAvailable: false,
                    response_from_dialogflow: ""

                }
                
                if(compound_score <= -0.2 && compound_score >= -1.0){

                        this.memeRequest().then((response_out: response_meme) => {

                            const jokeFetched: response_meme = response_out;
                            finalResponse.joke = jokeFetched.joke;
                            finalResponse.image = jokeFetched.image;
                            finalResponse.jokeAvailable = true;

                            resolve(finalResponse);
                            // return finalResponse;
                        }).catch((err) => {
                            console.log(`Error Occured - ${err}`);
                            reject(err);
                        })  
                    
                }else{

                    this.getResponseFromDialogFlow(inputText).then(response_console_dialogflow => {
                        finalResponse.response_from_dialogflow = response_console_dialogflow;
                        resolve(finalResponse);
                    })
                }

            }).catch(function (error) {
                console.error(`Error Occured - ${error}`);
                reject(error);
            });

        })

    }

    public getResponseFromDialogFlow(inputText: string): Promise<any> {

        const userId  = keys.config.session_id;

        return new Promise((resolve, reject) => {
            textQuery(inputText, userId).then((res) => {
                const resultQuery = res;
                const response_object = resultQuery[0];
            
                const response_console_dialogflow = {
                  "fulfillmentText": response_object.queryResult.fulfillmentText,
                }
            
                resolve(response_console_dialogflow.fulfillmentText);
            
              }).catch(function (error) {
                console.error(`Error Occured - ${error}`);
                reject(error);
            });
        })

    }

}




// export default memeRequest;
export let memeClassExport = new memeClass();
// export default {memeRequest,returnJokeIfSad} ;




