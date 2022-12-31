import { Router } from 'express';
import axios from 'axios';
import {keys} from '../support/Keys'
import {memeClassExport} from '../memes/memesHelper';
import sentimentAnalysisHelper from '../sentimentAnalysis/sentimentAnalysisHelper';
const sentimentAnalysisRoute = Router();

sentimentAnalysisRoute.post('/analyse', (req:any, res: any) => {
    if (req.method === 'POST') {


        const {inputText} = req.body;
		sentimentAnalysisHelper(inputText).then((response_out) => {
			const compound_score: number = response_out;
			return res.status(200).json({"compound": compound_score});

		}).catch(function (error) {
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