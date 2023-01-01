import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { logindata, regdata } from '../JSONdata/signin';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private as: AuthService, private router: Router) { }

  
  login: boolean = true;
  error: any;
  errormessage:any;

  // selectedrole: any;
  signindata: any;
  signupdata: any;

  move() {
    this.login = !this.login;
  }

  submit() {
    if(this.login){
      this.as.login(this.formlogin.value).then(res => {
        this.router.navigate(['/home']);
      })
    }
    else{
      // this.formreg.get("role")?.setValue(this.signupdata[5].value);
      this.as.signup(this.formreg.value).then(res => {
        this.router.navigate(['/home']);
      })
    }
  }

  formlogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  formreg = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    // role: new FormControl('user'),
    confirmpassword: new FormControl(''),
  })
  
  ngOnInit(): void {
    this.signindata = logindata;
    this.signupdata = regdata;
  }

}