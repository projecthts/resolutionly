import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { navbar } from '../JsonData/navbar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private as: AuthService, private af: AngularFireAuth, private router: Router) { }

  ifwhite: boolean = false;
  nav: any;
  navdata: any;
  user: string = "";

  // cart = faShoppingCart;
  ngOnInit(): void {

    this.as.getUserState().subscribe(user => {
      if (user == null){
        this.user = "user"
      }
      else{
        this.as.getprofile(user.uid).then((res: any) => {
          this.user = res.payload.data().name;
        })
      }
    })
    if (window.pageYOffset != 0) {
      this.ifwhite = true;
    }
    else{
      this.ifwhite = false;
    }
    this.navdata = navbar;
  }

  logout(){
    return this.af.signOut().then(() => {
      this.router.navigate(['/signin']);
    })
  }
  ngAfterViewInit(): void{
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event:any) {
    let nav = <HTMLElement>document.getElementsByClassName("main")[0];
    let nav2 = <HTMLElement>document.getElementsByClassName("main")[0];
    nav.style.backgroundColor = `rgba(255, 255, 255, ${window.pageYOffset / 100})`
    nav.style.color = `rgb(${255 - (window.pageYOffset)}, ${255 - (window.pageYOffset)}, ${255 - (window.pageYOffset)})`
  }
}