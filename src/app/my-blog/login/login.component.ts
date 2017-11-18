import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../login-service.service";
import {Data, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Data;
  userId;
  favourites;
  authorName;

  constructor(private login : LoginServiceService, private router: Router) {

  }

  ngOnInit() {
    this.login.getData().subscribe((data)=>{
      this.Data = data;
    })
    if(localStorage.getItem("isloggedin") == "true"){
      this.router.navigate(['blogs'])
    }
  }

  loginUser(e) {
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;

    var result : boolean = false;

    for (var i = 0; i < this.Data.length; i++) {

      if (username == this.Data[i].username && password == this.Data[i].password) {
        result = true;
        this.userId = this.Data[i].id;
        this.favourites = this.Data[i].favourites;
        this.authorName = this.Data[i].authorName;
      }
    }

    if(result == true){
      this.login.setUserLoggedIn(username, password, this.userId, this.favourites, this.authorName);
      this.router.navigate(['blogs']);
    }
    else {
      console.log("Login Failed");
    }
  }

}
