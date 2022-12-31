import * as initializeApp from 'firebase/app';
import * as firestore from 'firebase/firestore';
import { keys } from '../support/Keys'

class Firebase {

    public app;
    constructor(){
        this.app = initializeApp.initializeApp(keys.firebaseConfig);
    }
}