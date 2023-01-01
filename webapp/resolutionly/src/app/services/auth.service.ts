import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private af: AngularFireAuth, private db: AngularFirestore) { }

  getUserState() {
    return this.af.authState;
  }

  login(user:any) {
    return this.af.signInWithEmailAndPassword(user.email, user.password);
  }

  signup(user:any) {
    return new Promise((resolve, reject) => {
      this.af.createUserWithEmailAndPassword(user.email, user.password).then(
        usercred => {
          this.insertuserdata(user, usercred).then(res => {
            resolve("Success");
          })
            .catch(err => {
              reject(err);
            })
        }
      ).catch(err => {
        reject(err);
      })
    })
  }

  insertuserdata(user:any, usercred:any) {
    return new Promise((resolve, reject) => {
      this.db.doc(`Users/+91${user.phone}`).set({
        email: user.email,
        name: user.name,
        phone: user.phone,
        uid: usercred.user.uid
      }).then(res => {
        this.db.doc(`Index/${usercred.user.uid}`).set({
          phone: user.phone,
        })
        .then(res => resolve(res))
      })
    })
  }

  getprofile(useruid:any) {
    return new Promise((resolve, reject) => {
      this.getPhonenumber(useruid).subscribe((res:any) => {
        this.db.collection("Users").doc("+91"+ res.payload.data()["phone"]).snapshotChanges().subscribe(res => {
          resolve(res);
        })
      })
    })
  }

  getPhonenumber(useruid:any){
    return this.db.collection("Index").doc(useruid).snapshotChanges();
  }

  
  logout() {
    return this.af.signOut();
  }
}