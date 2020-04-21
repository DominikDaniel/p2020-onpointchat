import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storage: Storage) { }

  url = "/onpointchat-BE";
  user_id;

  create(nickname) {
    return this.http.post(`${this.url}/user`,{name: nickname});
  }

  getUserList()
  {
    return this.http.get(`${this.url}/users`);
  }

  setUserId(user_id)
  {
    this.user_id = user_id;
  }

  getUserId()
  {
    return this.user_id;
  }
  storeId(){
    var userId = this.getUserId();
    this.storage.set('Id', userId);
  }

  deleteId(){
    this.storage.clear();
  }

  checkStg(){
    this.storage.get('Id').then((id)=>
    {
      if(id !== null)
      {
        this.setUserId(id);
      }
      else
      {
        console.log("No user saved.");
      }
    });
  }

}
