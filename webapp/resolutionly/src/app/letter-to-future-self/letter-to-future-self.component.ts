import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letter-to-future-self',
  templateUrl: './letter-to-future-self.component.html',
  styleUrls: ['./letter-to-future-self.component.scss']
})
export class LetterToFutureSelfComponent implements OnInit {

  constructor(private as: AuthService, private db: AngularFirestore, private router: Router) { }

  user: any;
  resolutions: any = [];

  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.as.getprofile(res?.uid).then((res:any) => {
        this.user = res.payload.id;
        console.log(this.user);
        this.getresolutions();
        // this.getMoods();
        // this.getstories();
      })
    })
  }

  letterform = new FormGroup({
    content: new FormControl(' '),
    reminder: new FormControl(' ')
  })

  resolutionform = new FormGroup({
    resolution: new FormControl(' '),
    progress: new FormControl(' ')
  })

  getresolutions(){
    this.db.collection("Users").doc(this.user).collection("Resolutions").snapshotChanges().subscribe(res => {
      this.resolutions = res;
    })
  }
  addstory(){
    var date = new Date()
    this.db.collection("Users").doc(this.user).collection("LetterToSelf").doc(date.getFullYear().toString()).set({ "letterToSelf": this.letterform.get("content")?.value, "date":  this.letterform.get("reminder")?.value}).then(res => {
      this.letterform.get("content")?.setValue("");
      this.letterform.get("reminder")?.setValue("");
    })
  }

  addResolution(){
    this.db.collection("Users").doc(this.user).collection("Resolutions").add({ "resolution": this.resolutionform.get("resolution")?.value, "progress":  this.resolutionform.get("progress")?.value}).then(res => {
      this.resolutionform.get("resolution")?.setValue("");
      this.resolutionform.get("progress")?.setValue("");
    })
  }

  editResolution(x:any){
    this.resolutionform.get("resolution")?.setValue(x.payload.doc.data().resolution);
    this.resolutionform.get("progress")?.setValue(x.payload.doc.data().progress);
    this.deleteResolution(x.payload.doc.id);
  }

  deleteResolution(id:any){
    this.db.collection("Users").doc(this.user).collection("Resolutions").doc(id).delete();
  }
}
