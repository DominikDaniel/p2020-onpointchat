import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "/onpointchat-BE/";
  user_id;

  create(nickname) {
    return this.http.post("/onpointchat-BE/user",{name: nickname});
  }

  getUserList()
  {
    return this.http.get("/onpointchat-BE/users");
  }

  setUserId(user_id)
  {
    this.user_id = user_id;
  }

  getUserId()
  {
    return this.user_id;
  }


}
