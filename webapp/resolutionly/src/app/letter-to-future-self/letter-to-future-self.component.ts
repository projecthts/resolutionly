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

  ngOnInit(): void {
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.as.getprofile(res?.uid).then((res:any) => {
        this.user = res.payload.id;
        console.log(this.user);
        // this.getMoods();
        // this.getstories();
      })
    })
  }

  letterform = new FormGroup({
    content: new FormControl(' '),
    reminder: new FormControl(' ')
  })

  addstory(){
    var date = new Date()
    this.db.collection("Users").doc(this.user).collection("Stories").doc(date.getFullYear().toString()).set({ "letterToSelf": "" })
  }
}
