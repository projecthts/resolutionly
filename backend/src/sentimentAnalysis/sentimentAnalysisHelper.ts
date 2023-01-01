
import { rejects } from 'assert';
import axios from 'axios' 
import { resolve } from 'path';
import {response_meme} from '../support/Interfaces'
import {keys} from '../support/Keys'

const sentimentAnalysisHelper = (inputText: string): Promise<number> => {    
		const options: any = {
			method: 'POST',
			url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
			headers: {
				'content-type': 'application/json',
				'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
				'x-rapidapi-key': keys.config.NEXT_PUBLIC_RAPIDAPI_KEY
			},
			data: {language: 'english', text: inputText}
		};

		return new Promise((resolve, reject) => {
            axios
			.request(options).then(function (response) {
                const result = response.data;
                const compound_score: number = result.aggregate_sentiment.compound;

                resolve(compound_score);
        }).catch(function (error) {
            console.error(`Error Occured - ${error}`);
            reject(error);
        })
    })
}

export default sentimentAnalysisHelper;



