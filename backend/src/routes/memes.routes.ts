import { Router } from 'express';
import axios from 'axios';
import {keys} from '../support/Keys'
// import {memeRequest, returnJokeIfSad} from '../memes/memesHelper';
// import {memeRequest} from '../memes/memesHelper';
// import returnJokeIfSad from '../memes/memesHelper';
import {memeClassExport} from '../memes/memesHelper';
const meme = Router();

meme.get('/getRandom', (req:any, res: any) => {
    if (req.method === 'GET') {

        // memeClassExport()


        memeClassExport.memeRequest().then((response_out) => {
            console.log(`response_out ${JSON.stringify(response_out)}`);
            return res.status(200).json(response_out);
        }).catch((err) => {
            console.log(`Error Occured - ${err}`);
            return res.status(400);
        })
		
	}else{
        
        return res.status(400);

    }


})

// For testing of the made function
meme.post('/returnJokeIfSadElseDialogflow', (req:any, res: any) => {
    if (req.method === 'POST') {

        const {inputText} = req.body;
        console.log(`inputText ${inputText}`)


        memeClassExport.returnJokeIfSadElseDialogflow(inputText).then((response_out) => {
            console.log(`response_out ${JSON.stringify(response_out)}`);
            return res.status(200).json(response_out);
        }).catch((err) => {
            console.log(`Error Occured - ${err}`);
            return res.status(400);
        })
		
	}else{
        
        return res.status(400);

    }


})


	



export default meme;