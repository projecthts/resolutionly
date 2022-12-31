import { Router } from 'express';
import axios from 'axios';
import {keys} from '../support/Keys'
// import textQuery from '../chatbot/chatbot'
const sentimentAnalysisRoute = Router();

sentimentAnalysisRoute.post('/analyse', (req:any, res: any) => {
    if (req.method === 'POST') {


        const {inputText} = req.body;
        console.log(`inputText ${inputText}`)
		const options = {
			method: 'POST',
			url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
			headers: {
				'content-type': 'application/json',
				'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
				'x-rapidapi-key': keys.config.NEXT_PUBLIC_RAPIDAPI_KEY
			},
			data: {language: 'english', text: inputText}
		};

		axios
			.request(options)
			.then(function (response) {
                const result = response.data;
                const compound_score = result.aggregate_sentiment.compound;

				return res.status(200).json({"compound": compound_score});
			})
			.catch(function (error) {
				console.error(`Error Occured - ${error}`);
                return res.status(400);
			});
	} else {
		return res.status(400);
	}


});

sentimentAnalysisRoute.get('/',async (request:any, response: any) => {
  return response.json("OK");
});

export default sentimentAnalysisRoute;