import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(public router:Router, public auth:AuthService) { }

  email!:string;
  pass!:string;
  confirmPass!:string;
  
  checkPasswordsAndRegister() {
    if(this.pass === this.confirmPass) {
      if (this.pass.length >= 6) {
        this.auth.registerEmail(this.email, this.pass);
      }
      else {
        alert("Password must be at least 6 characters in length.")
      }
    }
    else {
      alert("Passwords must match.");
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      
  }

}
