import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'

const BASE_URL = 'http://localhost:3000/users/';
const header = {headers: new Headers({'Content-Type':'application/json'})}

@Injectable()
export class LoginServiceService {
  private username;
  private passward;

  constructor(private http : Http) {
    //localStorage.setItem("isloggedin","false");
  }

  getData(){
    return this.http.get(BASE_URL).map(res => res.json());
  }

  updateData(data, id){
    return this.http.patch(`${BASE_URL}${id}`,data,header).map(res => res.json());
  }

  setUserLoggedIn(username, password, authorId, favourites, authorName) {
    this.username = username;
    this.passward = password;
    localStorage.setItem("isloggedin","true");
    localStorage.setItem("author",username);
    localStorage.setItem("authorId",authorId);
    localStorage.setItem("authorName",authorName)
  }
}
