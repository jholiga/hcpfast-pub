import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  email!:string;
  pass!:string;

  emailLogin() {
    this.auth.emailSignin(this.email, this.pass);
  }

  ngOnDestroy(): void {
  }
}
