import * as initializeApp from 'firebase/app';
import * as firestore from 'firebase/firestore';
import { keys } from '../support/Keys'

class Firebase {

    public app = initializeApp.initializeApp(keys.firebaseConfig);
    public db = firestore.getFirestore(this.app);
    public collection = firestore.collection;
    public onSnapshot = firestore.onSnapshot;
    public query = firestore.query;
    public updateDoc = firestore.updateDoc;
    public doc = firestore.doc;
    public setDoc = firestore.setDoc;
    public addDoc = firestore.addDoc;

    constructor(){
        
    }

    public addData() : Promise<any>{
        return new Promise((resolve, reject) => {
            this.setDoc(this.doc(this.db, "cities", "LA"), {
                name: "Los Angeles",
                state: "CA",
                country: "USA"
              })
              .then((res: any) => {
                resolve(res)
              })
              .catch((err) => {
                reject(err)
              })
        })
    }

    public addResolution(phoneNumber: string, resolution: string) : Promise<any>{
        return new Promise((resolve, reject) => {
            this.addDoc(this.collection(this.db, `Users/${phoneNumber}/Resolutions/`), {
                resolution: resolution,
                progress: 0
              })
              .then((res: any) => {
                resolve(res)
              })
              .catch((err) => {
                reject(err)
              })
        })
    }
}

export let firebaseUtilities = new Firebase();
