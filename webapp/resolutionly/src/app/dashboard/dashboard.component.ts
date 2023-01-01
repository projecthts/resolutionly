import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private as: AuthService, private router: Router, private db: AngularFirestore) { }
postId:any;
  moods = ["joyful, happy, relaxed, silly, content, great",
    "productive, active, energetic, motivated",
    "average, normal, uneventful, good",
    "sick, tired, lazy, dull, unmotivated, bored",
    "sad, lonely, numb, depressed, insecure",
    "angry, frustrated, anxious, grumpy"]
    // plants = ["Planted a tree today!",
    // "Used Cycle or use public transport",
    // "Bought only what you need, to avoiding waste",
    // "Used reusable shopping bags and avoided products with excessive plastic packaging",
    // "Tried swapping, borrowing, renting or buying second-hand",
    // "Something other than these, making a green difference!"]
  user: any;
  monthdays: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  offset = 0;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  mshort = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  usermoods: Array<any> = [];
  monthsNumber = {
    January: '0',
    February: '1',
    March: '2',
    April: '3',
    May: '4',
    June: '5',
    July: '6',
    August: '7',
    September: '8',
    October: '9',
    November: '10',
    December: '11'
  }
  temp : number[] = [];
  in: boolean = true;

  // images = ["../../assets/images/chi1.jpeg", "../../assets/images/chi1.jpeg", "../../assets/images/chi1.jpeg", "../../assets/images/chi1.jpeg", "../../assets/images/chi1.jpeg", "../../assets/images/chi1.jpeg"]
  stories: Array<any> = [];

  stories2: any;
  storyform = new FormGroup({
    content: new FormControl(' ')
  })

  ngOnInit(): void {
    for (var i = 0; i < 53; i++) this.temp.push(i);
    for(let i = 0; i < (53*7); i++) this.usermoods.push({id: "", mood: -1})
    this.as.getUserState().subscribe(res => {
      if (!res) this.router.navigate(['/signin'])
      this.as.getprofile(res?.uid).then((res:any) => {
        this.user = res.payload.id;
        console.log(this.user);
        // this.getMoods();
        this.getstories();
      })
    })
  }

  // getMoods() {
  //   this.db.collection("Users").doc(this.user).collection("Moods").snapshotChanges().subscribe(res => {
  //     // this.usermoods = res;
  //     for(let i of res){
  //       this.usermoods[this.datetodaynumber(i.payload.doc.id)].mood = i.payload.doc.data()?.['mood'];
  //       this.usermoods[this.datetodaynumber(i.payload.doc.id)].id = i.payload.doc.id;
        
  //     }
  //   });
  // }

  getstory(x:any, day: number) {
    var docid: string = this.getdocid(x, day);
    var custobj = {
      "payload": {
        "doc": {
          "id": docid
        }
      }
    }
    this.stories2 = [custobj];
    console.log(this.stories2[0].payload.doc.id)
    this.stories = [];
    
    this.db.collection("Users").doc(this.user).collection("Stories").doc(docid).collection("Story").snapshotChanges().subscribe(res => {
      this.stories[Number(this.getdocid(x, day).replace(/\s/g, ''))] = [];
      for (let j of res) {
        console.log(j.payload.doc.id)
        var time = j.payload.doc.id.split(" ")
        var timestr = time[0] + " Hours " + time[1] + " Minutes " + time[2] + " Seconds";
        this.stories[Number(this.getdocid(x, day).replace(/\s/g, ''))].push({ "time": timestr, "story": j.payload.doc.data()?.['story'] });

      }
      console.log(this.stories)
  })

}

getstories(){
  this.stories = []
  this.db.collection("Users").doc(this.user).collection("Stories").snapshotChanges().subscribe(res => {
    var index = -1
    this.stories2 = res;
    this.stories2.reverse();
    for (let i of res) {
      this.stories = [];
      index += 1
      var id = i.payload.doc.id
      // console.log(id.replace(/\s/g, ''))
      // console.log("id ++" + Number(id.replace(" ", "")))
      this.stories[Number(id.replace(/\s/g, ''))] = [];
      this.db.collection("Users").doc(this.user).collection("Stories").doc(id).collection("Story").snapshotChanges().subscribe(res => {
        var ind = index;
        var id = i.payload.doc.id
        this.stories[Number(id.replace(/\s/g, ''))] = [];
        for (let j of res) {
          var time = j.payload.doc.id.split(" ")
          var timestr = time[0] + " Hours " + time[1] + " Minutes " + time[2] + " Seconds";
          this.stories[Number(id.replace(/\s/g, ''))].push({ "time": timestr, "story": j.payload.doc.data()?.['story'] });
          console.log(this.stories);
        }
      })
    }
  })
}

getdate(obj:any){
  var date = obj.split(" ");
  return this.days[date[3]] + " " + date[2] + " " + this.months[date[1]] + " " + date[0];
}

getid(x: any){
  return x.payload.doc.id.replace(/\s/g, '');
}

getdocid(number: number, day: number): string{
  var date = this.daynumbertodate(number);
  var datearr = date.split(' ');
  var finaldate: string = datearr[2] + " " + this.months.indexOf(datearr[1]) + " " + datearr[0] + " " + day;
  return finaldate;
}

addstory() {
  var date = new Date()
  this.db.collection("Users").doc(this.user).collection("Stories").doc(date.getFullYear().toString() + " " + date.getMonth().toString() + " " + date.getDate().toString() + " " + date.getDay().toString()).set({ "filler": "filler" }).then(res => {
    this.db.collection("Users").doc(this.user).collection("Stories").doc(date.getFullYear().toString() + " " + date.getMonth().toString() + " " + date.getDate().toString() + " " + date.getDay().toString()).collection("Story").doc(date.getHours().toString() + " " + date.getMinutes().toString() + " " + date.getSeconds().toString()).set({ "story": this.storyform.get("content")?.value }).then(res => {
    //   const headers = { 'content-type': 'application/json',
    // 'x-rapidapi-host': 'text-analysis12.p.rapidapi.com',
    // 'x-rapidapi-key': '21f05a919bmsh006432281901f7fp113deejsn5660fdc3d48d'};
    // const body = { language:'english',text: this.storyform.get("content")?.value };
    // this.http.post<any>('https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1', body, { headers }).subscribe(data => {
    //     this.postId = data;
    //     // console.log("lk");
    //     console.log(this.postId.sentiment);
    //     if(this.postId.sentiment== "negative"){console.log(this.postId.sentiment);
    //       this.http.post<any>('https://all-citizens-bank.herokuapp.com/sendpositivity', { title: this.postId.sentiment }).subscribe(data => {
    //         this.postId = data;
    //         console.log(data);
    //         console.log("data");
    //     });
    //   }
    // });
      this.storyform.get("content")?.setValue("");

    });
  })
}

addmood(mood:any) {
  var date = new Date()
  this.db.collection("Users").doc(this.user).collection("Moods").doc(date.getFullYear().toString() + " " + date.getMonth().toString() + " " + date.getDate().toString() + " " + date.getDay().toString()).set({ "mood": mood });
}

datetodaynumber(date: string){
  let datearr = date.split(" ");
  let num = Number(datearr[2]) - 1;
  for(let i = 0; i < Number(datearr[1]); i++){
    num += this.monthdays[i];
  }
  num += this.offset;
  return num;
}

daynumbertodate(num: number){
  num -= this.offset;
  num += 1;
  let month = 0;
  if(num <= 0){
    return String(31 + num) + " Dec 2022";
  }
  for(let i = 0; i < 12; i++){
    if(num - this.monthdays[i] > 0){
      num -= this.monthdays[i]
      month += 1;
    }
    else{
      break
    }
  }
  if(month == 12){
    return String(num) + " January 2024";
  }
  return String(num) + " " + this.months[month] + " " + "2023";
}

togglein(){
  this.in = !this.in;
}

}
