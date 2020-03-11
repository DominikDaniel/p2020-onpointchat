import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8000";
  user_id;

  create(nickname) {
    return this.http.post("http://localhost:8000/user",{name: nickname});
  }

  getUserList()
  {
    return this.http.get("http://localhost:8000/users");
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
