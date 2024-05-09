import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  logged:boolean = false;
  username:string = "";
  password:string = "";
  constructor(private loginService:LoginService) {
  }
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.logged = true;
    }
  }
  login(){
    this.loginService.login(this.username,this.password).subscribe((data) => {
      localStorage.setItem('token' ,data.token);
      this.logged = true;
    })
  }
  logOut(){
    localStorage.clear();
    this.logged = false;
  }
}
